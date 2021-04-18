import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { db } from '@/firebase';
import { Card } from '@/types/Card';

const gameStore = namespace('game');

@Component
class HandMixin extends Vue {
  @gameStore.State((state) => state.hand)
  private allCards!: Card[] | null

  @gameStore.Mutation
  setHand!: (hand: Card[]) => void

  trackPlayerHand(gameId: string, playerId: string): void {
    db.collection(`games/${gameId}/players/${playerId}/cards`)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const card = doc.data() as Card;
          return {
            ...card,
            id: doc.id,
          };
        });
        this.setHand(data);
      });
  }

  get hand(): Card[] {
    if (!this.allCards) return [];

    return this.allCards.slice(0, 7);
  }
}
export default HandMixin;
