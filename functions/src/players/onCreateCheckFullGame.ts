import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import chunk from "lodash.chunk";
import shuffle from "lodash.shuffle";

export const onCreateCheckFullGame = functions.firestore
  .document("games/{gameId}/players/{playerId}")
  .onCreate(async (change, context) => {
    const gameId = context.params.gameId;
    const gameRef = admin.firestore().doc(`games/${gameId}`);
    const gameSnapshot = await gameRef.get();
    const game = gameSnapshot.data();

    if (!game || game.hasStarted) return;

    const playersSnapshot = await gameRef.collection("players").get();

    const playerCount = playersSnapshot.size;

    if ((game.maxPlayers ?? 0) > playerCount) return;

    // Set game's `hasStarted` to true
    const startGameRequest = gameRef.update({
      hasStarted: true,
      turn: game.hostId,
    });

    // Deal to all players
    const cards = await getDeck(game.safeForWork);

    const shuffledDeck = shuffle(cards);
    const chunkSize = Math.floor(shuffledDeck.length / playerCount);
    const hands = chunk(shuffledDeck, chunkSize);

    const handRequests = playersSnapshot.docs.map((doc, index) => {
      const batch = admin.firestore().batch();
      const handCollection = doc.ref.collection("cards");
      const hand = hands[index];
      hand.forEach((card) => {
        const cardRef = handCollection.doc();
        batch.create(cardRef, card);
      });
      return batch.commit();
    });

    const allRequests: Promise<FirebaseFirestore.WriteResult | FirebaseFirestore.WriteResult[]>[] =
      [startGameRequest, ...handRequests];
    return Promise.all(allRequests);
  });

const getDeck = async (safeForWork: boolean) => {
  const collectionRef = admin.firestore().collection("captions");

  if (!safeForWork) {
    const cardsSnapshot = await collectionRef.get();
    const allCards = cardsSnapshot.docs.map((doc) => doc.data());
    return allCards;
  }

  const query = await collectionRef.where("safeForWork", "==", true).get();
  const safeForWorkCards = query.docs.map((doc) => doc.data());
  return safeForWorkCards;
};
