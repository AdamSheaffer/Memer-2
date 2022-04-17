import { Timestamp } from "./Firebase";
import { Maybe, PartialMaybe } from "./helpers";

export interface Presence {
  game?: string;
  lastChanged: Date;
  player: string;
  state: "Online" | "Offline";
}

export enum Role {
  admin = "admin",
  editor = "editor",
  player = "player",
}

export type Roles = { [k in Role]?: boolean };

export interface User {
  uid: string;
  fullName: Maybe<string>;
  gamesPlayed: number;
  gamesWon: number;
  lastChanged: Timestamp;
  photoURL: Maybe<string>;
  presence: Maybe<Presence>;
  roles: Roles;
  totalPoints: number;
  username: string;
}

export type UserChanges = PartialMaybe<User>;
