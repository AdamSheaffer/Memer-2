import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { Player } from "../../../types";

export const playerOnCreateSetTurnOrder = functions.firestore
  .document("games/{gameId}/players/{playerId}")
  .onCreate(async (playerSnapshot, context) => {
    const player = playerSnapshot.data() as Player;

    if (!player) {
      throw Error("Function triggered but no player was added");
    }

    const otherPlayersSnapshot = await admin
      .firestore()
      .collection(`games/${context.params.gameId}/players`)
      .get();

    const turnIndex = otherPlayersSnapshot.size;
    const updates: Partial<Player> = { turnIndex };

    return playerSnapshot.ref.update(updates);
  });
