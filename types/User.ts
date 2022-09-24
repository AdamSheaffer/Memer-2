import { Maybe, PartialMaybe } from "./helpers";

export interface User {
  uid: string;
  photoURL: Maybe<string>;
  username: Maybe<string>;
}

export type UserChanges = PartialMaybe<User>;
