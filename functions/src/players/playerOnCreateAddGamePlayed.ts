import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { Player, User } from "../../../types";

export const playerOnCreateAddGamePlayed = functions.firestore
  .document("games/{gameId}/players/{playerId}")
  .onCreate(async (playerSnapshot) => {
    const player = playerSnapshot.data() as Player;

    if (!player) {
      throw Error("Function triggered but no player was added");
    }

    const userId = player.uid;

    const userSnaphot = await admin.firestore().doc(`users/${userId}`).get();
    const user = userSnaphot.data() as User;

    if (!user) {
      throw Error("Player added did not match any document in /users");
    }

    const gamesPlayed = user.gamesPlayed ? user.gamesPlayed + 1 : 1;

    return userSnaphot.ref.update({ gamesPlayed });
  });
