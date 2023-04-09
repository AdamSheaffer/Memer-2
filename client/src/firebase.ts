import { Analytics, getAnalytics } from "firebase/analytics";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { collection, connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_API_KEY as string,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN as string,
  databaseURL: import.meta.env.VITE_DATABASE_URL as string,
  projectId: import.meta.env.VITE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID as string,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID as string,
  appId: import.meta.env.VITE_APP_ID as string,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
export const analytics: Analytics =
  import.meta.env.MODE === "production" ? getAnalytics(app) : { app };

// firestore refs
export const gamesCollectionRef = collection(db, "games");
export const categoriesCollectionRef = collection(db, "categories");
export const captionsCollectionRef = collection(db, "captions");

// emulators
if (import.meta.env.MODE === "development") {
  console.info("development: MEMER is using Firebase Emulators...");
  connectFirestoreEmulator(db, "localhost", 8000);
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectAuthEmulator(auth, "http://localhost:9099");
}
