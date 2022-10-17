import * as functions from "firebase-functions";

export const onUpdateAddPoints = functions.firestore
  .document("games/{gameId}/")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    if (!before.winningMeme && after.winningMeme) {
      console.log(`THERE IS A WINNER `);
    }
  });
