<template>
  <div id="game-root">
    <gameroom-background>
      <player-chip
        v-for="player in players"
        :key="player.uid"
        :player="player"
        :active="false"
        :pointsToWin="game.pointsToWin"/>

        <b-button v-if="showStartButton" @click="startGame">START</b-button>
    </gameroom-background>
  </div>
</template>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { db } from '@/firebase';
import UserMixin from '@/mixins/UserMixin';
import GameMixin from '@/mixins/GameMixin';
import PlayerMixin from '@/mixins/PlayerMixin';
import GameroomBackground from '@/components/GameroomBackground.vue';
import PlayerChip from '@/components/PlayerChip.vue';
import { Game } from '@/types/Game';
import gameService from '@/services/game';

const gameStore = namespace('game');

@Component({
  components: { GameroomBackground, PlayerChip },
})
export default class GameRoom extends Mixins(UserMixin, GameMixin, PlayerMixin) {
  get gameId(): string {
    return this.$route.params.gameId;
  }

  get isHost(): boolean {
    return this.game?.hostId === this.user?.uid;
  }

  get showStartButton(): boolean {
    return (
      this.isHost
      && !!this.game
      && !this.game.hasStarted
      && !!this.players
      && this.players.length > 1);
  }

  mounted(): void {
    this.trackGame(this.gameId);
    this.trackPlayers(this.gameId);
  }

  startGame(): void {
    gameService.startGame(this.gameId);
  }

  dealCards(): void {
    if (!this.players) {
      throw Error('No players in game to deal to');
    }
    const playerIds = this.players.map((p) => p.uid);
    gameService.dealToAllPlayers(this.gameId, playerIds);
  }

  @Watch('game')
  gameChanged(newVal: Game, oldVal: Game | null): void {
    if (!oldVal) return;

    const justStarted = newVal.hasStarted && !oldVal.hasStarted;

    if (justStarted && this.isHost) {
      this.dealCards();
    }
  }
}
</script>

<style lang="scss" scoped>

#game-root {
  width: 100%;
  height: 100%;
}

</style>
