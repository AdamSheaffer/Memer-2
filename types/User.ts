import { Maybe, PartialMaybe } from "./helpers";

export interface User {
  uid: string;
  photoURL: Maybe<string>;
  username: Maybe<string>;
}

export interface UserRoles {
  admin?: boolean;
  editor?: boolean;
}

export interface Profile {
  uid: string;
  providerId: Maybe<string>;
  name: Maybe<string>;
  email: Maybe<string>;
  verified: boolean;
  roles: UserRoles;
}

export type UserChanges = PartialMaybe<User>;
export type ProfileChanges = Partial<Profile>;
