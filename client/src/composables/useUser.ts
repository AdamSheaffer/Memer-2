import { signInAnonymously } from "@firebase/auth";
import { ref } from "vue";
import { Maybe, User } from "../../../types";
import { auth } from "../firebase";

const user = ref<Maybe<User>>(null);
const defaultPhotoURL = "https://avatars.dicebear.com/api/personas/default.svg";

const anonymouslySignInUser = async () => {
  const credentials = await signInAnonymously(auth);
  user.value = {
    uid: credentials.user.uid,
    username: localStorage.getItem("username") || "RANDO",
    photoURL: localStorage.getItem("photoURL") || defaultPhotoURL,
  };
};

const updateUser = ({ username, photoURL }: ProfileUpdates) => {
  if (!user.value) {
    throw Error("User is not set");
  }

  localStorage.setItem("username", username);
  localStorage.setItem("photoURL", photoURL);

  user.value = {
    username,
    photoURL,
    uid: user.value.uid,
  };
};

export type ProfileUpdates = { username: string; photoURL: string };

export const useUser = () => {
  return { user, anonymouslySignInUser, updateUser };
};
