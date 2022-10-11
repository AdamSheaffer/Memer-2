import { addDoc, collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { Game, GameSettings, PlayerChanges, User as MemerUser } from "../../../types";
import { gamesCollectionRef } from "../firebase";

export const createGame = async (
  gameSettings: GameSettings,
  hostId: string,
  hostPhotoURL: string
) => {
  const payload: Partial<Game> = {
    hostId,
    hostPhotoURL,
    beginDate: Timestamp.now(),
    lastUpdated: Timestamp.now(),
    hasStarted: false,
    ...gameSettings,
  };
  const { id } = await addDoc(gamesCollectionRef, payload);
  return id;
};

export const joinGame = async (gameId: string, user: MemerUser) => {
  const payload: PlayerChanges = {
    uid: user.uid,
    username: user.username,
    photoURL: user.photoURL,
    isActive: true,
  };

  const gameRef = doc(gamesCollectionRef, gameId);
  const playersCollectionRef = collection(gameRef, "players");
  const playerDoc = doc(playersCollectionRef, user.uid);
  const playerSnapshot = await getDoc(playerDoc);

  if (!playerSnapshot.exists()) {
    payload.score = 0;
  }

  return setDoc(playerDoc, payload, { merge: true });
};

// const pickRandomTagOptions = (categories: Category[], num: number): string[] =>
//   shuffle(categories)
//     .map((c) => c.description)
//     .slice(0, num);
