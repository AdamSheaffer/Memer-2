import { FirebaseOptions, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_API_KEY as string,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN as string,
  databaseURL: import.meta.env.VITE_DATABASE_URL as string,
  projectId: import.meta.env.VITE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_APP_ID as string,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const realtimeDb = getDatabase(app);
export const functions = getFunctions(app);

if (import.meta.env.MODE === "development") {
  console.info("development: MEMER is using Firebase Emulators...");

  connectFirestoreEmulator(db, "localhost", 8000);
  connectDatabaseEmulator(realtimeDb, "localhost", 9000);
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectAuthEmulator(auth, "http://localhost:9099");
}

// export const gamesCollection = collection(db, "games");
// export const gameDoc = (gameId: string) => doc(gamesCollection, gameId);
// export const playersCollection = (gameId: string) => collection(gameDoc(gameId), "players");

export const googleSignIn = () => signInWithPopup(auth, new GoogleAuthProvider());
export const signOut = () => auth.signOut();
