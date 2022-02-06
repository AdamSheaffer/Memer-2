import * as admin from "firebase-admin";

admin.initializeApp();

// captions
export * from "./captions/captionOnCreateNormalize";
// categories
export * from "./categories/categoryOnCreateTimestamp";
// game
export * from "./game/gameOnUpdateAddPlayerPoints";
// online detection
export * from "./online-detection/onlineStatusOnUpdateChangePlayerStatus";
export * from "./online-detection/onlineStatusOnUpdateCheckCounter";
// players
export * from "./players/playerOnCreateAddGamePlayed";
export * from "./players/playerOnCreateCheckFullGame";
export * from "./players/playerOnCreateSetTurnOrder";
// users
export * from "./users/searchUsers";
