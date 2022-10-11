import { signInAnonymously } from "@firebase/auth";
import { doc, updateDoc } from "@firebase/firestore";
import { ref } from "vue";
import { Maybe, User } from "../../../types";
import { auth, db } from "../firebase";

const user = ref<Maybe<User>>(null);
const defaultPhotoURL = "https://avatars.dicebear.com/api/personas/default.svg";

export type ProfileUpdates = { username: string; photoURL: string };

export const useUser = () => {
  const anonymouslySignInUser = async () => {
    const credentials = await signInAnonymously(auth);
    user.value = {
      uid: credentials.user.uid,
      username: localStorage.getItem("username") || "RANDO",
      photoURL: localStorage.getItem("photoURL") || defaultPhotoURL,
    };
  };

  const updateUser = async ({ username, photoURL }: ProfileUpdates, gameId?: Maybe<string>) => {
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

    if (gameId) {
      const firestorePlayerRef = doc(db, "games", gameId, "players", user.value.uid);
      return updateDoc(firestorePlayerRef, { username, photoURL });
    }
  };

  return { user, anonymouslySignInUser, updateUser };
};
