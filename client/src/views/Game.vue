<template>
  <div id="game-root">
    <gameroom-background />
    <div v-if="dataLoaded">
      <players :game="game" :players="players" :current-player-id="user.uid" />
    </div>
    <div v-if="dataLoaded" class="game-table">
      <div class="game">
        <div class="game-container">
          <b-button v-if="showStartButton" @click="startGame">START</b-button>
          <div class="hand">
            <player-hand :cards="hand" />
            <action-header :game="game" :players="players" :userId="user.uid" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';
import GameroomBackground from '@/components/GameroomBackground.vue';
import PlayerChip from '@/components/PlayerChip.vue';
import ActionHeader from '@/components/ActionHeader.vue';
import PlayerHand from '@/components/PlayerHand.vue';
import Players from '@/components/Players.vue';
import UserMixin from '@/mixins/UserMixin';
import GameMixin from '@/mixins/GameMixin';
import PlayerMixin from '@/mixins/PlayerMixin';
import HandMixin from '@/mixins/HandMixin';
import { Game } from '@/types/Game';
import gameService from '@/services/game';

@Component({
  components: {
    GameroomBackground, PlayerChip, ActionHeader, PlayerHand, Players,
  },
})
export default class GameRoom extends Mixins(
  UserMixin, GameMixin, PlayerMixin, HandMixin,
) {
  get gameId(): string {
    return this.$route.params.gameId;
  }

  get dataLoaded(): boolean {
    return !!this.game && !!this.players && !!this.players.length;
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
    this.trackPlayerHand(this.gameId, this.user.uid);
  }

  startGame(): void {
    gameService.startGame(this.gameId, this.user.uid);
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

#game-root, .game-container, .game-table {
  width: 100%;
  height: 100%;
}

.game-table {
  grid-template-columns: 1fr 80% 1fr;
  grid-template-rows: 1fr 80% 1fr;
  display: grid;

}

.game-container {
  display: grid;
}

.game {
  grid-row-start: 2;
  grid-column-start: 2;
}

.hand {
  align-self: end;
  margin: 8% 15%;
}
</style>
