<template>
  <div>
    <modal :dark="true">
      <div>
        <h2 class="has-text-white has-text-centered" :class="headerClass">
          {{ game.winningMeme.top && game.winningMeme.top.toUpperCase() }}
        </h2>
        <b-image :src="game.winningMeme.photoURL"/>
        <h2 class="has-text-white has-text-centered" :class="headerClass">
          {{ game.winningMeme.bottom && game.winningMeme.bottom.toUpperCase() }}
        </h2>

        <div class="is-size-6 has-text-success has-text-centered">
          <span class="has-text-warning">
            {{ winnerName }}
          </span>
          {{ winningMessage }}
        </div>
      </div>

      <div class="mt-6 mb-3 is-flex is-justify-content-center" v-if="isHost && hasGameWinner">
        <b-button type="is-primary" size="is-small" @click="startNewGame">START NEW GAME</b-button>
      </div>
    </modal>
    <confetti v-if="gameWinner" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import MemeTextMixin from '@/mixins/MemeTextMixin';
import { Game } from '@/types/Game';
import { Player } from '@/types/Player';
import Modal from '@/components/Modal.vue';
import Confetti from '@/components/Confetti.vue';

const gameStore = namespace('game');

@Component({
  components: { Modal, Confetti },
})
export default class WinningModal extends Mixins(MemeTextMixin) {
  @gameStore.State
  public readonly game!: Game;

  @gameStore.State
  public readonly players!: Player[];

  @gameStore.Getter
  public readonly roundWinner!: Player | null

  @gameStore.Getter
  public readonly gameWinner!: Player | null

  @gameStore.Getter
  public readonly isHost!: boolean;

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

  get hasGameWinner(): boolean {
    return !!this.gameWinner;
  }

  mounted(): void {
    if (!this.game.winningMeme) return;

    this.setHeaderSize(this.game.winningMeme);
  }

  startNewGame(): void {
    if (this.isHost && this.gameWinner) {
      this.$emit('start-new-game');
    }
  }
}
</script>

<style>

</style>
