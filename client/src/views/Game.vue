<template>
  <gameroom-background>
    <div v-if="game && players.length" id="game-root">
      <player-chip
        v-for="player in players"
        :key="player.uid"
        :player="player"
        :active="false"
        :pointsToWin="game.pointsToWin"/>

      <div v-for="card in hand" :key="card.id" class="card">
        {{ card.top }} {{ card.bottom }}
      </div>

      <b-button v-if="showStartButton" @click="startGame">START</b-button>
      <action-header :game="game" :players="players" :userId="user.uid" />
    </div>
  </gameroom-background>
</template>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';
import GameroomBackground from '@/components/GameroomBackground.vue';
import PlayerChip from '@/components/PlayerChip.vue';
import ActionHeader from '@/components/ActionHeader.vue';
import UserMixin from '@/mixins/UserMixin';
import GameMixin from '@/mixins/GameMixin';
import PlayerMixin from '@/mixins/PlayerMixin';
import HandMixin from '@/mixins/HandMixin';
import { Game } from '@/types/Game';
import gameService from '@/services/game';

@Component({
  components: { GameroomBackground, PlayerChip, ActionHeader },
})
export default class GameRoom extends Mixins(
  UserMixin, GameMixin, PlayerMixin, HandMixin,
) {
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

#game-root {
  width: 100%;
  height: 100%;
}

</style>
