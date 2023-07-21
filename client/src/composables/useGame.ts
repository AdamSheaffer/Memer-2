import { Unsubscribe } from "@firebase/util";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  Timestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import orderby from "lodash.orderby";
import { computed, onUnmounted, ref } from "vue";
import {
  Game,
  Maybe,
  Meme,
  Player,
  PlayerChanges,
  RoundType,
  RoundTypeOption,
} from "../../../types";
import { db } from "../firebase";
import { mapCollection, mapDoc } from "../utils/mapCollectionDocs";
import { useUser } from "./useUser";

const gamesCollectionRef = collection(db, "games");
const game = ref<Maybe<Game>>(null);
const players = ref<Player[]>([]);

const getNextRoundType = (): RoundType => {
  if (!game.value) {
    throw Error("`game` is null`");
  }

  const isReverseRound = Math.random() < (game.value.reverseRoundFrequency ?? 0);

  return isReverseRound
    ? { roundType: RoundTypeOption.Reverse, isSpecial: true }
    : { roundType: RoundTypeOption.Standard, isSpecial: false };
};

export const useGame = (gameId: string) => {
  const { user } = useUser();
  const firestoreGameRef = doc(gamesCollectionRef, gameId);
  const firestorePlayersCollectionRef = collection(firestoreGameRef, "players");

  const unsubscribes: Unsubscribe[] = [];

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

  const initialize = async () => {
    const callbacks = await Promise.all([trackGame(), trackPlayers()]);
    unsubscribes.push(...callbacks);
  };

  const updateGame = (updates: Partial<Game>) => {
    const payload: Partial<Game> = {
      lastUpdated: Timestamp.now(),
      ...updates,
    };
    return updateDoc(firestoreGameRef, payload);
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
    return players.value
      .filter((p) => !p.removed && p.isActive)
      .sort((a, b) => a.turnIndex - b.turnIndex);
  });

  const playerCount = computed(() => {
    return activePlayers.value.length;
  });

  const isReverseRound = computed(() => {
    return game.value?.round?.roundType === RoundTypeOption.Reverse;
  });

  const judge = computed(() => {
    return players.value.find((p) => p.uid === game.value?.turn);
  });

  const judgeShouldStartTurn = computed(() => {
    return !game.value?.tagOptions;
  });

  const judgeIsPickingCategory = computed(() => {
    return !!game.value?.tagOptions?.length && !game.value.tagSelection;
  });

  const judgeIsPickingReverseRoundCaption = computed(() => {
    if (!isReverseRound.value) {
      return false;
    }

    return !game.value?.memeTemplate;
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
      });

    return orderby(submissions, ["top", "bottom", "photoURL"]);
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

    const sortedPlayers = [...activePlayers.value].sort((a, b) => a.turnIndex - b.turnIndex);
    const playerIndex = sortedPlayers.findIndex((p) => p.uid === game.value?.turn);
    const nextIndex = playerIndex === activePlayers.value.length - 1 ? 0 : playerIndex + 1;
    return sortedPlayers[nextIndex];
  });

  const updatePlayer = (playerId: string, changes: PlayerChanges) => {
    const playerRef = doc(firestorePlayersCollectionRef, playerId);
    return updateDoc(playerRef, changes);
  };

  const resetRound = (nextTagOptions: string[]) => {
    const batch = writeBatch(db);
    players.value.forEach((player) => {
      const playerRef = doc(firestorePlayersCollectionRef, player.uid);
      const updates: PlayerChanges = { memePlayed: null };
      batch.update(playerRef, updates);
    });

    const gameChanges: Partial<Game> = {
      gifOptionURLs: [],
      memeTemplate: null,
      memeTemplateTimestamp: null,
      round: getNextRoundType(),
      roundWinner: null,
      tagOptions: nextTagOptions,
      tagSelection: null,
      turn: nextPlayerTurn.value?.uid,
      winningMeme: null,
    };

    batch.update(firestoreGameRef, gameChanges);

    return batch.commit();
  };

  const resetGame = async (nextTagOptions: string[]) => {
    const batch = writeBatch(db);
    players.value.forEach((player) => {
      const changes: PlayerChanges = {
        score: 0,
        memePlayed: null,
        imageUrlPlayed: null,
      };
      const playerRef = doc(firestorePlayersCollectionRef, player.uid);
      batch.update(playerRef, changes);
    });

    const gameChanges: Partial<Game> = {
      tagOptions: nextTagOptions,
      turn: nextPlayerTurn.value?.uid,
      tagSelection: null,
      winner: null,
      roundWinner: null,
      gifOptionURLs: null,
      memeTemplate: null,
      memeTemplateTimestamp: null,
      winningMeme: null,
      lastUpdated: Timestamp.now(),
    };

    batch.update(firestoreGameRef, gameChanges);

    return batch.commit();
  };

  const clearGame = () => {
    game.value = null;
    players.value = [];
  };

  onUnmounted(() => {
    unsubscribes.forEach((fn) => fn());
  });

  return {
    activePlayers,
    clearGame,
    currentPlayer,
    everyoneHasSubmitted,
    game,
    gameWinner,
    host,
    isPickingWinner,
    isReverseRound,
    isSubmissionRound,
    isYourTurn,
    judge,
    judgeShouldStartTurn,
    judgeIsPickingCategory,
    judgeIsPickingGif,
    judgeIsPickingReverseRoundCaption,
    nextPlayerTurn,
    playerCount,
    players,
    playerSubmissions,
    resetGame,
    resetRound,
    roundWinner,
    startGame,
    initialize,
    updateGame,
    updatePlayer,
    userIsHost,
  };
};
