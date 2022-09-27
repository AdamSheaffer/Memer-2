import { Unsubscribe } from "@firebase/util";
import { collection, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { computed, onUnmounted, ref } from "vue";
import { Card } from "../../../types";
import { gamesCollectionRef } from "../firebase";
import { mapCollection } from "../utils/mapCollectionDocs";

export const useHand = (gameId: string, playerId: string) => {
  const playersRef = collection(doc(gamesCollectionRef, gameId), "players");
  const playerCardsRef = collection(doc(playersRef, playerId), "cards");
  const loading = ref(false);
  const allPlayerCards = ref<Card[]>([]);
  let unsubscribe: Unsubscribe;

  const hand = computed(() => {
    return allPlayerCards.value.slice(0, 7);
  });

  const removeCard = (cardId: string) => {
    const cardRef = doc(playerCardsRef, cardId);
    return deleteDoc(cardRef);
  };

  const trackHand = async () => {
    loading.value = true;

    const snapshot = await getDocs(playerCardsRef);
    allPlayerCards.value = mapCollection<Card>(snapshot);

    unsubscribe = onSnapshot(playerCardsRef, (snapshot) => {
      allPlayerCards.value = mapCollection<Card>(snapshot);
    });

    loading.value = false;
  };

  onUnmounted(() => unsubscribe());

  trackHand();

  return { hand, removeCard };
};
