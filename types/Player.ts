import { PartialMaybe } from "./helpers";
import { Meme } from "./Meme";
import { Roles } from "./User";

export interface Player {
  uid: string;
  fullName: string;
  username: string;
  photoURL: string;
  score: number;
  isActive: boolean;
  memePlayed?: Meme | null;
  imageUrlPlayed?: string | null;
  roles: Roles;
  removed?: boolean;
  turnIndex: number;
}

export type PlayerChanges = PartialMaybe<Player>;
