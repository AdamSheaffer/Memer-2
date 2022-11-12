import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// For the sake of billing:
// Currently not using this function and handling this client side instead
export const onUpdateAddPoints = functions.firestore
  .document("games/{gameId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    if (!before.roundWinner && after.roundWinner) {
      const { gameId } = context.params;

      const playerRef = admin
        .firestore()
        .collection("games")
        .doc(gameId)
        .collection("players")
        .doc(after.roundWinner);

      const playerSnapshot = await playerRef.get();
      const currentPlayerScore = playerSnapshot.data()?.score ?? 0;

      return playerRef.update({ score: currentPlayerScore + 1 });
    }

    return Promise.resolve();
  });
