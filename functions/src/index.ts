import * as admin from "firebase-admin";

admin.initializeApp();

// captions
export * from "./captions/onCreateNormalize";
// categories
export * from "./categories/onCreateAddTimestamp";
// online detection
export * from "./online-detection/onUpdateChangePlayerStatus";
// players
export * from "./players/onCreateCheckFullGame";
export * from "./players/onCreateSetTurnOrder";
