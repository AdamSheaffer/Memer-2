import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { db } from '@/firebase';
import { Player } from '@/types/Player';

const gameStore = namespace('game');

@Component
class PlayerMixin extends Vue {
  @gameStore.State((state) => state.players)
  public players!: Player[] | null

  @gameStore.Mutation
  setPlayers!: (players: Player[]) => void

  trackPlayers(gameId: string): void {
    db.collection('games')
      .doc(gameId)
      .collection('players')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data() as Player);
        this.setPlayers(data);
      });
  }

  get playerCount(): number {
    return this.players?.length || 0;
  }
}
export default PlayerMixin;
