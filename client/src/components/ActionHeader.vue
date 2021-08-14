<template>
  <h2 class="is-size-4 mb-2 has-text-success has-text-centered">
    {{ actionHeader }}
  </h2>
</template>

<script lang="ts">
import { Player } from '@/types/Player';
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const gameStore = namespace('game');

@Component
export default class ActionHeader extends Vue {
  @gameStore.Getter
  public readonly isSubmissionRound!: boolean;

  @gameStore.Getter
  public readonly isYourTurn!: boolean;

  @gameStore.Getter
  public readonly isPickingWinner!: boolean;

  @gameStore.Getter
  public readonly playerTurn!: Player;

  @gameStore.Getter
  public readonly player!: Player;

  get actionHeader(): string | null {
    const { isSubmissionRound, isYourTurn } = this;

    if (isSubmissionRound && isYourTurn) {
      return 'PLAYERS ARE SUBMITTING';
    }

    if (isSubmissionRound && !isYourTurn) {
      if (this.player.memePlayed) {
        return 'WAITING ON OTHER PLAYERS';
      }

      return 'PICK A CAPTION';
    }

    if (this.isPickingWinner && this.playerTurn) {
      if (this.isYourTurn) {
        return 'CREATE YOUR FAVORITE MEME';
      }
      return `${this.playerTurn.username.toUpperCase()} IS PICKING A MEME`;
    }

    return null;
  }
}
</script>

<style>

</style>
