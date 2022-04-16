import { GoogleAuthProvider, signInWithPopup, signOut, User as FirebaseUser } from "firebase/auth";
import { getDoc, setDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { Maybe, Roles, User as UserProfile } from "../../../types";
import { auth, userRef } from "../firebase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as Maybe<UserProfile>,
    initialAuthenticationChecked: false,
  }),
  actions: {
    googleLogin() {
      return signInWithPopup(auth, new GoogleAuthProvider());
    },

    logout() {
      signOut(auth);
    },

    async createUserProfile(user: FirebaseUser) {
      const profile: UserProfile = {
        uid: user.uid,
        fullName: user.displayName,
        username: user.displayName?.split(" ")[0],
        photoURL: user.photoURL,
        gamesPlayed: 0,
        roles: { player: true },
        totalPoints: 0,
      };
      await setDoc(userRef(user.uid), profile);
      return profile;
    },

    async handleSignIn(user: FirebaseUser) {
      const userProfile = await this.getUserProfile(user.uid);

      if (userProfile) return userProfile;

      return this.createUserProfile(user);
    },

    async getUserProfile(uid: string) {
      const userSnapshot = await getDoc(userRef(uid));

      if (!userSnapshot.exists) return null;
      return userSnapshot.data() as FirebaseUser;
    },

    async updateUserRoles(userId: string, roles: Roles) {
      return setDoc(userRef(userId), { roles }, { merge: true });
    },
  },
});
