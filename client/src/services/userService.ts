import { GoogleAuthProvider, signInWithPopup, signOut, User as FirebaseUser } from "firebase/auth";
import { getDoc, setDoc, Timestamp } from "firebase/firestore";
import { Roles, User as MemerUser } from "../../../types";
import { auth, userRef } from "../firebase";

export const googleLogin = () => signInWithPopup(auth, new GoogleAuthProvider());

export const logout = () => signOut(auth);

export const createUserProfile = async (user: FirebaseUser) => {
  const profile: MemerUser = {
    uid: user.uid,
    fullName: user.displayName,
    username: user.displayName?.split(" ")?.[0] ?? "USER",
    photoURL: user.photoURL,
    gamesPlayed: 0,
    gamesWon: 0,
    roles: { player: true },
    totalPoints: 0,
    lastChanged: Timestamp.now(),
    presence: null,
  };
  await setDoc(userRef(user.uid), profile);
  return profile;
};

export const handleSignIn = async (user: FirebaseUser) => {
  const userProfile = await getUserProfile(user.uid);

  if (userProfile) return userProfile;

  return createUserProfile(user);
};

export const getUserProfile = async (uid: string) => {
  const userSnapshot = await getDoc(userRef(uid));

  if (!userSnapshot.exists) return null;
  return userSnapshot.data() as MemerUser;
};

export const updateUserRoles = async (userId: string, roles: Roles) => {
  return setDoc(userRef(userId), { roles }, { merge: true });
};
