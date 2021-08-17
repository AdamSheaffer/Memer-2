<template>
  <div class="players-outer">
    <div class="players">
      <div
        v-for="(player, index) in positionedPlayers"
        :key="player.uid" class="player"
        :class="`player--${index}`">
        <player-chip
          class="chip"
          :ready="player.memePlayed"
          :player="player"
          :active="player.uid === game.turn"
          :pointsToWin="game.pointsToWin"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import PlayerChip from '@/components/PlayerChip.vue';
import { Player } from '@/types/Player';
import { Game } from '@/types/Game';

@Component({
  components: { PlayerChip },
})
export default class Players extends Vue {
  @Prop({ required: true }) players!: Player[]

  @Prop({ required: true }) game!: Game;

  @Prop({ required: true }) currentPlayerId!: string;

  get positionedPlayers(): Player[] {
    return this.players.sort((p) => (p.uid === this.currentPlayerId ? -1 : 1));
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables';

.players-outer {
  display: grid;
  grid-template-rows: 1fr 80% 1fr;
  grid-template-columns: 1fr 90% 1fr;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -800;
}

.players {
  grid-row-start: 2;
  grid-column-start: 2;
  display: grid;
  grid-template-columns: 1fr 5% 1fr 1fr 1fr 5% 1fr;
  grid-template-rows: repeat(4, 1fr);
  width: 100%;
  height: 100%;
}

.player {
  width: 100%;

  &--0 {
    grid-row: 7;
    grid-column: 4;
    justify-self: center;
  }

  &--1 {
    grid-row: 2;
    grid-column: 1;
    align-self: center;
    justify-self: center;
  }

  &--2 {
    grid-row: 2;
    grid-column: 7;
    align-self: center;
    justify-self: center;
  }

  &--3 {
    grid-row: 3;
    grid-column: 7;
    align-self: center;
    justify-self: center;
  }

  &--4 {
    grid-row: 3;
    grid-column: 1;
    align-self: center;
    justify-self: center;
  }

  &--5 {
    grid-row: 1;
    grid-column: 3;
    align-self: baseline;
    justify-self: center;
  }

  &--6 {
    grid-row: 1;
    grid-column: 5;
    align-self: baseline;
    justify-self: center;
  }
}

.chip {
  margin: 0 auto;
}
</style>
