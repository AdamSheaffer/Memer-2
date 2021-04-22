<template>
  <div class="mt-3">
    <div v-if="isCurrentPlayersTurn">
      <h1 class="has-text-centered has-text-success">
        IT'S YOUR TURN!
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Game } from '@/types/Game';
import { Player } from '@/types/Player';

@Component
export default class ActionHeader extends Vue {
  @Prop({ required: true }) game!: Game

  @Prop({ required: true }) players!: Player[]

  @Prop({ required: true }) userId!: string;

  get isCurrentPlayersTurn(): boolean {
    return this.game.turn === this.userId;
  }

  get currentPlayer(): Player {
    const player = this.players.find((p) => p.uid === this.userId);

    if (!player) throw Error('Can\'t find current player in game');

    return player;
  }
}
</script>

<style>

</style>
