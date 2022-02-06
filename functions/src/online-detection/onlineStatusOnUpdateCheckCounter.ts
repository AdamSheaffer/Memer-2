import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onlineStatusOnUpdateCheckCounter = functions.database
  .ref("status/{uid}")
  .onWrite(async (change) => {
    if (!change || !change.after || !change.before) {
      console.log("No updates made");
      return Promise.resolve();
    }

    const previous = change.before.val();
    const updated = change.after.val();

    if (!!previous && previous.state === updated.state) {
      console.log("No change to status. Returning...");
      return Promise.resolve();
    }

    const cameOnline = updated.state === "Online";
    const countRef = admin.database().ref("playersOnline");
    const lastCountSnap = await countRef.once("value");
    const lastCount = lastCountSnap.val();
    let updatedCount = cameOnline ? lastCount + 1 : lastCount - 1;
    updatedCount = updatedCount >= 0 ? updatedCount : 0;
    return countRef.set(updatedCount);
  });
