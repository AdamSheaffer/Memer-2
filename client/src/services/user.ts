import { GoogleAuthProvider, signInWithPopup, signOut, User as FirebaseUser } from "firebase/auth";
import { getDoc, setDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { Roles, User as MemerUser } from "../types";
import { userDoc } from "./db";

export const googleLogin = () => signInWithPopup(auth, new GoogleAuthProvider());
export const logout = () => signOut(auth);

const getUser = async (uid: string) => {
  const userSnapshot = await getDoc(userDoc(uid));

  if (!userSnapshot.exists) return null;
  return userSnapshot.data() as FirebaseUser;
};

const createUserProfile = async (user: FirebaseUser) => {
  const profile: MemerUser = {
    uid: user.uid,
    fullName: user.displayName,
    username: user.displayName?.split(" ")[0],
    photoURL: user.photoURL,
    gamesPlayed: 0,
    roles: { player: true },
    totalPoints: 0,
  };
  await setDoc(userDoc(user.uid), profile);
  return profile;
};

export const handleSignIn = async (user: FirebaseUser) => {
  const userProfile = await getUser(user.uid);

  if (userProfile) return userProfile;

  return createUserProfile(user);
};

export const updateUserRoles = (userId: string, roles: Roles) => {
  return setDoc(userDoc(userId), { roles }, { merge: true });
};
