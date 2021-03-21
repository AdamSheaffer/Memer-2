import firebase from 'firebase/app';
import { firestore } from '@/firebase';
import { User } from '@/types/User';

const getUser = async (uid: string) => {
  const userSnapshot = await firestore.doc(`users/${uid}`).get();

  if (!userSnapshot.exists) return null;

  return userSnapshot.data() as User;
};

const createUserProfile = async (user: firebase.User): Promise<User> => {
  const profile: User = {
    uid: user.uid,
    fullName: user.displayName,
    username: user.displayName?.split(' ')[0],
    photoURL: user.photoURL,
    gamesPlayed: 0,
    roles: { player: true },
    totalPoints: 0,
  };
  await firestore.doc(`users/${user.uid}`).set(profile);
  return profile;
};

const handleSignIn = async (user: firebase.User): Promise<User> => {
  const userProfile = await getUser(user.uid);

  if (userProfile) return userProfile;

  return createUserProfile(user);
};

export default handleSignIn;
