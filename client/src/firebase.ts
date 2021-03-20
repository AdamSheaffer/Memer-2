import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const realtimeDb = firebase.database();
export const auth = firebase.auth();

if (process.env.NODE_ENV === 'development') {
  console.info('Now Meme-ing with Firebase Emulators...');
  firestore.useEmulator('localhost', 8000);
  realtimeDb.useEmulator('localhost', 9000);
  auth.useEmulator('http://localhost:9099');
}

export const signOut = (): Promise<void> => auth.signOut();

export const googleSignIn = (): Promise<firebase.auth.UserCredential> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};
