import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onlineStatusOnUpdateChangePlayerStatus = functions.database
  .ref("status/{uid}")
  .onWrite(async (change, context) => {
    if (!change || !change.after || !change.before) {
      console.log("No updates made");
      return Promise.resolve();
    }
    const eventStatus = change.after.val();
    const userFirestoreRef = admin.firestore().doc(`users/${context.params.uid}`);

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

    const updates = [];

    // If the user was in a game and goes offline, remove them from the game
    const { state, game, player } = status;
    const needsRemoval = state === "Offline" && !!game && !!player;
    if (needsRemoval) {
      const playerFirestoreRef = admin.firestore().doc(`games/${game}/players/${player}`);
      const playerSnapshot = await playerFirestoreRef.get();
      if (playerSnapshot.exists) {
        const playerRemoval = playerFirestoreRef.update({ isActive: false });
        updates.push(playerRemoval);
      }
    }

    // Update lastChanged
    eventStatus.lastChanged = new Date(eventStatus.lastChanged);
    const userUpdate = userFirestoreRef.update({ presence: eventStatus });
    updates.push(userUpdate);

    return Promise.all(updates);
  });
