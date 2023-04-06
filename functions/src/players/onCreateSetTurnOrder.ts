import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onCreateSetTurnOrder = functions.firestore
  .document("games/{gameId}/players/{playerId}")
  .onCreate(async (playerSnapshot, context) => {
    const player = playerSnapshot.data();

    if (!player) {
      functions.logger.debug("Function triggered but no player was added");
      return null;
    }

    const otherPlayersSnapshot = await admin
      .firestore()
      .collection(`games/${context.params.gameId}/players`)
      .get();

    const turnIndex = otherPlayersSnapshot.size;
    const updates = { turnIndex };

    return playerSnapshot.ref.update(updates);
  });
