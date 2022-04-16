import { Maybe } from "./helpers";

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
  fullName?: Maybe<string>;
  gamesPlayed?: Maybe<number>;
  gamesWon?: Maybe<number>;
  lastChanged?: Maybe<Date>;
  photoURL?: Maybe<string>;
  presence?: Maybe<Presence>;
  roles?: Maybe<Roles>;
  totalPoints?: Maybe<number>;
  username?: Maybe<string>;
}
