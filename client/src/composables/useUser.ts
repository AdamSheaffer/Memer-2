import { User as FirebaseUser, signInAnonymously } from "@firebase/auth";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { ref } from "vue";
import { Maybe, Profile, User } from "../../../types";
import { auth, db } from "../firebase";
import { mapDoc } from "../utils/mapCollectionDocs";

const user = ref<Maybe<User>>(null);
const profile = ref<Maybe<Profile>>(null);
const defaultPhotoURL = "https://avatars.dicebear.com/api/personas/default.svg";

const initializeUser = () => {
  let initialAuthCheckComplete = false;

  return new Promise<void>((resolve) => {
    auth.onAuthStateChanged(async (firebaseUser) => {
      if (initialAuthCheckComplete) {
        return;
      }

      initialAuthCheckComplete = true;

      if (firebaseUser) {
        user.value = {
          uid: firebaseUser.uid,
          username: localStorage.getItem("username") || "RANDO",
          photoURL: localStorage.getItem("photoURL") || defaultPhotoURL,
        };
      }

      if (firebaseUser && !firebaseUser?.isAnonymous) {
        const existingProfile = await getProfile(firebaseUser.uid);

        if (existingProfile) {
          profile.value = existingProfile;
        } else {
          const newProfile = await createProfile(firebaseUser);
          profile.value = newProfile;
        }
      }

      if (!firebaseUser) {
        await anonymouslySignInUser();
      }
      resolve();
    });
  });
};

const anonymouslySignInUser = async () => {
  const credentials = await signInAnonymously(auth);
  user.value = {
    uid: credentials.user.uid,
    username: localStorage.getItem("username") || "RANDO",
    photoURL: localStorage.getItem("photoURL") || defaultPhotoURL,
  };
};

const signInWithGoogle = () => signInWithRedirect(auth, new GoogleAuthProvider());

const switchToAnonymousUser = async () => {
  await signOut(auth);
  profile.value = null;
  return anonymouslySignInUser();
};

const createProfile = async (user: FirebaseUser): Promise<Profile> => {
  const collectionRef = collection(db, "profiles");
  const docRef = doc(collectionRef, user.uid);
  const [providerData] = user.providerData;
  const newProfile = {
    providerId: providerData?.providerId ?? null,
    name: providerData?.displayName ?? null,
    email: providerData?.email ?? null,
    verified: false,
    roles: { admin: false, editor: false },
  };

  await setDoc(docRef, newProfile);
  return { ...newProfile, uid: user.uid };
};

const getProfile = async (userId: string) => {
  const collectionRef = collection(db, "profiles");
  const docRef = doc(collectionRef, userId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return mapDoc<Profile>(snapshot);
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
  return { user, profile, updateUser, initializeUser, signInWithGoogle, switchToAnonymousUser };
};
