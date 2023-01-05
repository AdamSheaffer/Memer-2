import { Timestamp } from "firebase/firestore";
import { Game } from "../../../../../types";

export const createFakeGame = (options?: Partial<Game>): Game => ({
  uid: Date.now().toString(),
  beginDate: Timestamp.now(),
  hasStarted: false,
  hostId: "fake_user_id",
  hostPhotoURL: "fake_host_photo_url",
  turn: "fake_user_id",
  tagOptions: null,
  tagSelection: null,
  gifOptionURLs: null,
  memeTemplate: null,
  memeTemplateTimestamp: null,
  roundWinner: null,
  winner: null,
  winningMeme: null,
  round: null,
  maxPlayers: 5,
  pointsToWin: 5,
  safeForWork: false,
  reverseRoundFrequency: 0.5,
  timeLimit: 0,
  lastUpdated: Timestamp.now(),
  ...options,
});
