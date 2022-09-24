import { Maybe, PartialMaybe } from "./helpers";
import { Meme } from "./Meme";

export interface Player {
  uid: string;
  photoURL: Maybe<string>;
  username: Maybe<string>;
  score: number;
  isActive: boolean;
  memePlayed?: Meme | null;
  imageUrlPlayed?: string | null;
  removed?: boolean;
  turnIndex: number;
}

export type PlayerChanges = PartialMaybe<Player>;
