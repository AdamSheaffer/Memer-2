import * as admin from "firebase-admin";

admin.initializeApp();

export * from "./game/pointWon";
export * from "./game/gameFull";
export * from "./players/registerGamePlayed";
export * from "./presence/updateOnlineCounter";
export * from "./presence/userStatusChanged";
export * from "./data/emulatorPopulate";
