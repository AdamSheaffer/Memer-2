import { signInAnonymously } from "@firebase/auth";
import { ref } from "vue";
import { Maybe, User } from "../../../types";
import { auth } from "../firebase";

const user = ref<Maybe<User>>(null);

export const useUser = () => {
  const anonymouslySignInUser = async () => {
    const credentials = await signInAnonymously(auth);
    user.value = {
      uid: credentials.user.uid,
      username: null, // Grab from localstorage
      photoURL: null, // Grab from localstorage
    };
  };

  return { user, anonymouslySignInUser };
};
