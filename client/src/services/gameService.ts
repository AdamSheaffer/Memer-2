import { addDoc, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { Game, GameSettings, PlayerChanges, User as MemerUser } from "../../../types";
import { gameRef, gamesCollectionRef, playersCollectionRef } from "../firebase";

export const createGame = async (gameSettings: GameSettings, hostId: string) => {
  const payload: Partial<Game> = {
    hostId,
    beginDate: Timestamp.now(),
    lastUpdated: Timestamp.now(),
    hasStarted: false,
    ...gameSettings,
  };
  const { id } = await addDoc(gamesCollectionRef, payload);
  return id;
};

export const updateGame = (game: Partial<Game>, gameId: string) => {
  if (!gameId && !game.uid) {
    throw Error("Must supply a game ID to update");
  }

  const payload: Partial<Game> = {
    lastUpdated: Timestamp.now(),
    ...game,
  };
  return setDoc(gameRef(gameId), payload, { merge: true });
};

export const joinGame = async (gameId: string, user: MemerUser) => {
  const payload: PlayerChanges = {
    ...mapUserToPlayer(user),
    isActive: true,
  };

  const playerDoc = doc(playersCollectionRef(gameId), user.uid);
  const playerSnapshot = await getDoc(playerDoc);

  if (!playerSnapshot.exists()) {
    payload.score = 0;
  }

  return setDoc(playerDoc, payload, { merge: true });
};

export const startGame = (gameId: string, playerId: string) => {
  return updateGame(
    {
      hasStarted: true,
      turn: playerId,
    },
    gameId
  );
};

export const mapUserToPlayer = (user: MemerUser): PlayerChanges => ({
  uid: user.uid,
  fullName: user.fullName,
  username: user.username,
  photoURL: user.photoURL,
  roles: user.roles,
});
// const createHands = async (handsNeeded: number): Promise<Card[][]> => {
//   const snapshot = await captionsRef.get();
//   const deck = snapshot.docs.map((doc) => doc.data() as Card);
//   const shuffled = shuffle(deck);
//   const chunkSize = Math.floor(shuffled.length / handsNeeded);
//   const hands = chunk(shuffled, chunkSize);
//   return hands;
// };

// const dealToAllPlayers = async (gameId: string, playerIds: string[]): Promise<void> => {
//   const hands = await createHands(playerIds.length);

//   playerIds.forEach((playerId, index) => {
//     const batch = db.batch();
//     const handCollection = playerRef(gameId, playerId).collection("cards");
//     const hand = hands[index];
//     hand.forEach((card: Card) => {
//       const ref = handCollection.doc(card.id);
//       batch.set(ref, card);
//     });
//     batch.commit();
//   });
// };

// const pickRandomTagOptions = (categories: Category[], num: number): string[] =>
//   shuffle(categories)
//     .map((c) => c.description)
//     .slice(0, num);

// const updatePlayer = (gameId: string, playerId: string, changes: PlayerChanges): Promise<void> => {
//   const ref = playerRef(gameId, playerId);
//   return ref.update(changes);
// };

// const removeCard = (gameId: string, playerId: string, cardId: string): Promise<void> => {
//   const cardRef = playerRef(gameId, playerId).collection("cards").doc(cardId);
//   return cardRef.delete();
// };

// const resetRound = (
//   gameId: string,
//   nextTurn: string,
//   tagOptions: string[],
//   players: Player[]
// ): Promise<void> => {
//   const batch = db.batch();
//   players.forEach((player) => {
//     const ref = playerRef(gameId, player.uid);
//     const changes: PlayerChanges = { memePlayed: null };
//     batch.update(ref, changes);
//   });

//   const gameChanges: Game = {
//     tagOptions,
//     turn: nextTurn,
//     roundWinner: null,
//     winningMeme: null,
//     tagSelection: null,
//     gifOptionURLs: [],
//     memeTemplate: null,
//     memeTemplateTimestamp: null,
//   };

//   batch.update(gameRef(gameId), gameChanges);

//   return batch.commit();
// };

// const resetGame = async (
//   gameId: string,
//   players: Player[],
//   startingTurn: string,
//   tagOptions: string[]
// ): Promise<void> => {
//   const batch = db.batch();
//   players.forEach((player) => {
//     const changes: PlayerChanges = {
//       score: 0,
//       memePlayed: null,
//       imageUrlPlayed: null,
//     };
//     const ref = playerRef(gameId, player.uid);
//     batch.update(ref, changes);
//   });

//   const gameChanges: Game = {
//     tagOptions,
//     turn: startingTurn,
//     tagSelection: null,
//     winner: null,
//     roundWinner: null,
//     gifOptionURLs: null,
//     memeTemplate: null,
//     memeTemplateTimestamp: null,
//     winningMeme: null,
//     lastUpdated: firebase.firestore.Timestamp.now(),
//   };

//   batch.update(gameRef(gameId), gameChanges);

//   return batch.commit();
// };
