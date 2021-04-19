import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Game } from '@/types/Game';
import { db } from '@/firebase';

const gameStore = namespace('game');

@Component
class GameMixin extends Vue {
  @gameStore.State((state) => state.game)
  public game!: Game | null

  @gameStore.Mutation
  setGame!: (game: Game) => void

  trackGame(gameId: string): void {
    db.collection('games').doc(gameId).onSnapshot((snapshot) => {
      const data = snapshot.data() as Game;
      this.setGame(data);
    });
  }
}
export default GameMixin;
