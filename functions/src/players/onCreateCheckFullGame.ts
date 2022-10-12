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

    if (game.maxPlayers! > playerCount) return;

    // Set game's `hasStarted` to true
    const startGameRequest = gameRef.update({
      hasStarted: true,
      turn: game.hostId,
    });

    // Deal to all players
    const cardsSnapshot = await admin.firestore().collection("captions").get();
    const cards = cardsSnapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));

    const shuffledDeck = shuffle(cards);
    const chunkSize = Math.floor(shuffledDeck.length / playerCount);
    const hands = chunk(shuffledDeck, chunkSize);

    const handRequests = playersSnapshot.docs.map((doc, index) => {
      const batch = admin.firestore().batch();
      const handCollection = doc.ref.collection("cards");
      const hand = hands[index];
      hand.forEach((card) => {
        const cardRef = handCollection.doc(card.uid!);
        batch.create(cardRef, card);
      });
      return batch.commit();
    });

    const allRequests: Promise<any>[] = [startGameRequest, ...handRequests];
    return Promise.all(allRequests);
  });
