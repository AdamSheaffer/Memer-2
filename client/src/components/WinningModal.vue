<template>
  <div>
    <modal :dark="true">
      <div>
        <h2 class="has-text-white has-text-centered is-size-3">
          {{ game.winningMeme.top && game.winningMeme.top.toUpperCase() }}
        </h2>
        <b-image :src="game.winningMeme.photoURL"/>
        <h2 class="has-text-white has-text-centered is-size-3">
          {{ game.winningMeme.bottom && game.winningMeme.bottom.toUpperCase() }}
        </h2>
        <h5 class="is-size-6 has-text-success has-text-centered mt-1">
          <span class="has-text-warning">
            {{ winnerName }}
          </span>
          {{ winningMessage }}
        </h5>
      </div>

    </modal>
    <confetti v-if="gameWinner" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Game } from '@/types/Game';
import { Player } from '@/types/Player';
import Modal from '@/components/Modal.vue';
import Confetti from '@/components/Confetti.vue';

const gameStore = namespace('game');

@Component({
  components: { Modal, Confetti },
})
export default class WinningModal extends Vue {
  @gameStore.State
  public readonly game!: Game;

  @gameStore.State
  public readonly players!: Player[];

  @gameStore.Getter
  public readonly roundWinner!: Player | null

  @gameStore.Getter
  public readonly gameWinner!: Player | null

  get winnerName(): string | null {
    return (
      this.gameWinner?.username.toUpperCase()
      || this.roundWinner?.username.toUpperCase()
      || null);
  }

  get winningMessage(): string | null {
    if (this.gameWinner) {
      return 'WINS THE GAME!';
    }

    if (this.roundWinner) {
      return 'WINS THE ROUND';
    }

    return null;
  }
}
</script>

<style>

</style>
