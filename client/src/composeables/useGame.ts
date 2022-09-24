import { computed } from "@vue/reactivity";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { onUnmounted, ref } from "vue";
import { Game, Maybe, Meme, Player } from "../../../types";
import { db } from "../firebase";
import { mapCollection, mapDoc } from "../utils/mapCollectionDocs";
import { useUser } from "./useUser";

const gamesCollectionRef = collection(db, "games");
const { user } = useUser();

export const useGame = (gameId: string) => {
  const firestoreGameRef = doc(gamesCollectionRef, gameId);
  const firestorePlayersCollectionRef = collection(firestoreGameRef, "players");

  const game = ref<Maybe<Game>>(null);
  const players = ref<Player[]>([]);
  const unsubscribes: Array<() => void> = [];

  const trackGame = async () => {
    const docRef = doc(gamesCollectionRef, gameId);
    const snapshot = await getDoc(docRef);
    game.value = mapDoc<Game>(snapshot);

    return onSnapshot(docRef, (snapshot) => {
      game.value = mapDoc<Game>(snapshot);
    });
  };

  const trackPlayers = async () => {
    const snapshot = await getDocs(firestorePlayersCollectionRef);
    players.value = mapCollection<Player>(snapshot);

    return onSnapshot(firestorePlayersCollectionRef, (snapshot) => {
      players.value = mapCollection<Player>(snapshot);
    });
  };

  const trackChanges = async () => {
    const callbacks = await Promise.all([trackGame(), trackPlayers()]);
    unsubscribes.push(...callbacks);
  };

  const updateGame = (updates: Partial<Game>) => {
    const payload: Partial<Game> = {
      lastUpdated: Timestamp.now(),
      ...updates,
    };
    return setDoc(firestoreGameRef, payload, { merge: true });
  };

  const startGame = (playerId: string) => {
    return updateGame({
      hasStarted: true,
      turn: playerId,
    });
  };

  const userIsHost = computed(() => {
    return game.value?.hostId === user.value!.uid;
  });

  const isYourTurn = computed(() => {
    return game.value?.turn === user.value!.uid;
  });

  const host = computed(() => {
    return players.value.find((p) => p.uid === game.value!.hostId);
  });

  const currentPlayer = computed(() => {
    return players.value.find((p) => p.uid === user.value?.uid);
  });

  const activePlayers = computed(() => {
    return players.value.filter((p) => !p.removed && p.isActive);
  });

  const playerCount = computed(() => {
    return activePlayers.value.length;
  });

  const judge = computed(() => {
    return players.value.find((p) => p.uid === game.value?.turn);
  });

  const judgeIsPickingCategory = computed(() => {
    return !!game.value?.tagOptions?.length && !game.value.tagSelection;
  });

  const judgeIsPickingGif = computed(() => {
    return !!game.value?.tagSelection && !game.value.memeTemplate;
  });

  const isSubmissionRound = computed(() => {
    return !!game.value?.memeTemplate && !everyoneHasSubmitted.value;
  });

  const isPickingWinner = computed(() => {
    return everyoneHasSubmitted.value && !game.value?.winningMeme;
  });

  const everyoneHasSubmitted = computed(() => {
    if (!activePlayers.value.length) return false;

    return activePlayers.value.every((p) => {
      const playerIsJudge = p.uid === judge.value?.uid;
      const hasSubmitted = !!p.memePlayed;
      return playerIsJudge || hasSubmitted;
    });
  });

  const playerSubmissions = computed(() => {
    if (!everyoneHasSubmitted.value) return [];

    const judgeId = judge.value?.uid;
    const submissions = activePlayers.value
      .filter((player) => player.uid !== judgeId)
      .map((player) => {
        if (!player.memePlayed)
          throw Error(`Attempted to get submission for player ${player.uid} but none was given`);
        const meme: Meme = {
          top: player.memePlayed.top ?? "",
          bottom: player.memePlayed.bottom ?? "",
          photoURL: player.memePlayed.photoURL,
        };
        return meme;
      })
      .sort((a, b) => (a.bottom! < b.bottom! ? -1 : 1));

    return submissions;
  });

  const roundWinner = computed(() => {
    if (!game.value?.roundWinner) return null;

    return players.value.find((p) => p.uid === game.value?.roundWinner) ?? null;
  });

  const gameWinner = computed(() => {
    if (!game.value?.winner) return null;

    return players.value.find((p) => p.uid === game.value?.winner) ?? null;
  });

  const nextPlayerTurn = computed(() => {
    if (!activePlayers.value.length) return null;

    const sortedPlayers = activePlayers.value.sort((a, b) => a.turnIndex - b.turnIndex);
    const playerIndex = sortedPlayers.findIndex((p) => p.uid === game.value?.turn);
    const nextIndex = playerIndex === players.value.length - 1 ? 0 : playerIndex + 1;
    return sortedPlayers[nextIndex];
  });

  onUnmounted(() => {
    unsubscribes.forEach((fn) => fn());
  });

  return {
    activePlayers,
    currentPlayer,
    everyoneHasSubmitted,
    firestoreGameRef,
    game,
    gameWinner,
    host,
    isPickingWinner,
    isSubmissionRound,
    isYourTurn,
    judge,
    judgeIsPickingCategory,
    judgeIsPickingGif,
    nextPlayerTurn,
    playerCount,
    players,
    playerSubmissions,
    roundWinner,
    startGame,
    trackChanges,
    updateGame,
    userIsHost,
  };
};
