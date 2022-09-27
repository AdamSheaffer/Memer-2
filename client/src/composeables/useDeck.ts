import { getDocs } from "@firebase/firestore";
import { collection, doc, writeBatch } from "firebase/firestore";
import chunk from "lodash.chunk";
import shuffle from "lodash.shuffle";
import { ref } from "vue";
import { Card } from "../../../types";
import { captionsCollectionRef, db, gamesCollectionRef } from "../firebase";
import { mapCollection } from "../utils/mapCollectionDocs";

const deck = ref<Card[]>([]);

export const useDeck = () => {
  const loading = ref(false);

  const load = async () => {
    loading.value = true;

    if (!deck.value.length) {
      const snapshot = await getDocs(captionsCollectionRef);
      deck.value = mapCollection<Card>(snapshot);
    }

    loading.value = false;
  };

  const dealToPlayers = async (gameId: string, playerIds: string[]) => {
    if (!deck.value.length) {
      await load();
    }

    const hands = createHands(playerIds.length);
    const gameRef = doc(gamesCollectionRef, gameId);
    const playersCollectionRef = collection(gameRef, "players");

    playerIds.forEach((playerId, index) => {
      const batch = writeBatch(db);
      const playerRef = doc(playersCollectionRef, playerId);
      const handCollection = collection(playerRef, "cards");
      const hand = hands[index];
      hand.forEach((card: Card) => {
        const ref = doc(handCollection, card.uid);
        batch.set(ref, card);
      });
      batch.commit();
    });
  };

  const createHands = (handsNeeded: number) => {
    const shuffled = shuffle(deck.value);
    const chunkSize = Math.floor(shuffled.length / handsNeeded);
    const hands = chunk(shuffled, chunkSize);
    return hands;
  };

  return { dealToPlayers, deck, load, loading };
};
