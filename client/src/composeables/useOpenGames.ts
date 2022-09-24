import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ref } from "vue";
import { Game } from "../../../types";
import { db } from "../firebase";
import { mapCollection } from "../utils/mapCollectionDocs";

const gamesCollectionRef = collection(db, "games");

export const useOpenGames = () => {
  const openGames = ref<Game[]>([]);
  const q = query(gamesCollectionRef, where("hasStarted", "==", false));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    openGames.value = mapCollection<Game>(snapshot);
  });

  return { openGames, unsubscribe };
};
