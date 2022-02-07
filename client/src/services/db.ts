import { collection, doc } from "firebase/firestore";
import { db } from "../firebase";

export const gamesCollection = collection(db, "games");
export const gameDoc = (gameId: string) => doc(gamesCollection, gameId);
export const playersCollection = (gameId: string) => collection(gameDoc(gameId), "players");
export const usersCollection = collection(db, "users");
export const userDoc = (userId: string) => doc(usersCollection, userId);
