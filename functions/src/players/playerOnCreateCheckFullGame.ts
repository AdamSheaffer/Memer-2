import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const playerOnCreateCheckFullGame = functions.firestore
  .document("games/{gameId}/players/{playerId}")
  .onCreate(async (change, context) => {
    const gameId = context.params.gameId;
    const gameRef = admin.firestore().doc(`games/${gameId}`);
    const gameSnapshot = await gameRef.get();
    const game = gameSnapshot.data();

    if (!game || game.hasStarted) return;

    const playersSnapshot = await gameRef.collection("players").get();

    const playerCount = playersSnapshot.size;

    if (game.maxPlayers > playerCount) return;

    gameRef.update({
      hasStarted: true,
      turn: game.hostId,
    });
  });
