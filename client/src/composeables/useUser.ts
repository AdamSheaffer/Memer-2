import { signInAnonymously } from "@firebase/auth";
import { doc, updateDoc } from "@firebase/firestore";
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import { Maybe, User } from "../../../types";
import { auth, db } from "../firebase";

const user = ref<Maybe<User>>(null);

export type ProfileUpdates = { username: string; photoURL: string };

export const useUser = () => {
  const anonymouslySignInUser = async () => {
    const credentials = await signInAnonymously(auth);
    user.value = {
      uid: credentials.user.uid,
      username: localStorage.getItem("username"),
      photoURL: null, // Grab from localstorage
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

  const userNeedsProfile = computed(() => !user.value?.username); // TODO: check photoURL too

  return { user, anonymouslySignInUser, updateUser, userNeedsProfile };
};
