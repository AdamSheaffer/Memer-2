import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onUpdateChangePlayerStatus = functions.database
  .ref("status/{uid}")
  .onWrite(async (change) => {
    if (!change || !change.after || !change.before) {
      console.log("No updates made");
      return Promise.resolve();
    }
    const eventStatus = change.after.val();

    // It is likely that the Realtime Database change that triggered
    // this event has already been overwritten by a fast change in
    // online/offline status, so re-read the current data
    // and compare the timestamps.
    const statusSnapshot = await change.after.ref.once("value");
    const status = statusSnapshot.val();
    if (status.lastChanged > eventStatus.lastChanged) {
      console.log("Already overwritten", status, eventStatus);
      return null;
    }

    // If the user was in a game and goes offline, remove them from the game
    const { state, game, player } = status;
    const needsRemoval = state === "Offline" && !!game && !!player;
    if (needsRemoval) {
      const playerFirestoreRef = admin.firestore().doc(`games/${game}/players/${player}`);
      const playerSnapshot = await playerFirestoreRef.get();
      if (playerSnapshot.exists) {
        return playerFirestoreRef.update({ isActive: false });
      }
    }
  });
