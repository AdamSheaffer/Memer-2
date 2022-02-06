import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const gameOnUpdateAddPlayerPoints = functions.firestore
  .document("games/{gameId}")
  .onUpdate(async (change) => {
    if (!change || !change.after || !change.before) {
      console.log("No updates made");
      return null;
    }

    const lastGame = change.before.data();
    const game = change.after.data();

    if (!game) {
      console.log("No game found");
      return null;
    }

    const hasPointWon = !!lastGame && !lastGame.roundWinner && !!game.roundWinner;
    const hasGameWon = !!lastGame && !lastGame.winner && !!game.winner;

    if (!hasGameWon && !hasPointWon) {
      console.log("No updates to points. Exiting...");
      return null;
    }

    const userId = game.roundWinner.uid;
    const userRef = admin.firestore().doc(`users/${userId}`);
    const userSnaphot = await userRef.get();
    const user = userSnaphot.data();

    if (!user) {
      console.log("No user found. Cannot update points");
      return null;
    }

    const updates: any = {
      totalPoints: (user.totalPoints || 0) + 1,
    };

    if (hasGameWon) {
      updates.gamesWon = (user.gamesWon || 0) + 1;
    }

    return userRef.update(updates);
  });
