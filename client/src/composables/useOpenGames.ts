import { Unsubscribe } from "@firebase/util";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { onUnmounted, ref } from "vue";
import { Game, Maybe } from "../../../types";
import { db } from "../firebase";
import { mapCollection } from "../utils/mapCollectionDocs";

const gamesCollectionRef = collection(db, "games");

export const useOpenGames = () => {
  const openGames = ref<Game[]>([]);
  const loading = ref(true);
  const unsubscribe = ref<Maybe<Unsubscribe>>(null);

  const trackOpenGames = async () => {
    const q = query(gamesCollectionRef, where("hasStarted", "==", false));

    const snapshot = await getDocs(q);
    openGames.value = mapCollection<Game>(snapshot);
    loading.value = false;

    unsubscribe.value = onSnapshot(q, (snapshot) => {
      openGames.value = mapCollection<Game>(snapshot);
    });
  };

  onUnmounted(() => unsubscribe.value && unsubscribe.value());

  trackOpenGames();

  return { openGames, loading };
};
