// import { Timestamp } from "firebase/firestore";
import { Timestamp } from "./Firebase";
import { Maybe } from "./helpers";
import { Meme } from "./Meme";
import { RoundType } from "./RoundType";

export interface Game {
  uid?: string;
  beginDate?: Timestamp;
  hasStarted?: boolean;
  hostId: Maybe<string>;
  hostPhotoURL: Maybe<string>;
  turn?: string;
  tagOptions: Maybe<string[]>;
  tagSelection: Maybe<string>;
  gifOptionURLs: Maybe<string[]>;
  memeTemplate: Maybe<Meme>;
  memeTemplateTimestamp: Maybe<Timestamp>;
  roundWinner: Maybe<string>;
  winner: Maybe<string>;
  winningMeme: Maybe<Meme>;
  roundType: Maybe<RoundType>;
  maxPlayers?: number;
  pointsToWin?: number;
  safeForWork?: boolean;
  reverseRoundFrequency?: number;
  timeLimit?: number;
  lastUpdated?: Timestamp;
}
