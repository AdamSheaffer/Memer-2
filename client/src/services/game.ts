import { addDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { Game, User } from "../../../types";
import { gameRef, gamesCollectionRef, playersCollectionRef } from "../firebase";

export const createGame = async (gameSettings: Game) => {
  const payload: any = {
    beginDate: Timestamp.now(),
    lastUpdated: Timestamp.now(),
    ...gameSettings,
  };
  const { id } = await addDoc(gamesCollectionRef, payload);
  return id;
};

export const updateGame = (game: Partial<Game>, gameId: string): Promise<void> => {
  if (!gameId && !game.uid) {
    throw Error("Must supply a game ID to update");
  }

  const payload: Partial<Game> = {
    lastUpdated: Timestamp.now(),
    ...game,
  };
  return setDoc(gameRef(gameId), payload, { merge: true });
};

export const joinGame = (gameId: string, user: User) => {
  const playerDoc = doc(playersCollectionRef(gameId), user.uid);
  return setDoc(playerDoc, { ...user, isActive: true });
};

export const startGame = (gameId: string, playerId: string): Promise<void> =>
  updateGame(
    {
      hasStarted: true,
      turn: playerId,
    },
    gameId
  );

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
