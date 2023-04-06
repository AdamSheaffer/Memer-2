import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onUpdateChangePlayerStatus = functions.database
  .ref("status/{uid}")
  .onWrite(async (change) => {
    if (!change || !change.after || !change.before) {
      functions.logger.debug("Function was triggered but no updates were made");
      return null;
    }
    const eventStatus = change.after.val();

    const statusSnapshot = await change.after.ref.once("value");
    const status = statusSnapshot.val();
    if (status.lastChanged > eventStatus.lastChanged) {
      functions.logger.debug("Player status was already overwritten");
      return null;
    }

    // If the user was in a game and goes offline, remove them from the game
    const { state, game, player } = status;
    const needsRemoval = state === "Offline" && !!game && !!player;
    if (needsRemoval) {
      const playerFirestoreRef = admin.firestore().doc(`games/${game}/players/${player}`);
      const playerSnapshot = await playerFirestoreRef.get();
      if (playerSnapshot.exists) {
        await playerFirestoreRef.update({ isActive: false });
      }
    }

    return;
  });
