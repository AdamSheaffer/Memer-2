import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const setPlayerOrder = functions.firestore
    .document("games/{gameId}/players/{playerId}")
    .onCreate(async (playerSnapshot, context) => {
      const player = playerSnapshot.data();

      if (!player) {
        throw Error("Function triggered but no player was added");
      }

      const otherPlayersSnapshot = await admin.firestore()
          .collection(`games/${context.params.gameId}/players`)
          .get();

      const turnIndex = otherPlayersSnapshot.size;

      return playerSnapshot.ref.update({turnIndex});
    });
