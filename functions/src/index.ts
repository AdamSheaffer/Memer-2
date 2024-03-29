import * as admin from "firebase-admin";

admin.initializeApp();

// captions
export * from "./captions/onCreateNormalize";
// categories
export * from "./categories/onCreateAddTimestamp";
// cleanup
export * from "./game/cleanup";
// players
export * from "./players/onCreateCheckFullGame";
export * from "./players/onCreateSetTurnOrder";
