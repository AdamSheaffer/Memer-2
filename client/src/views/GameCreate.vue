<template>
  <div class="home">
    <b-button v-if="isLoggedIn" @click="createGame">CREATE GAME</b-button>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { Game } from '@/types/Game';
import UserMixin from '@/mixins/UserMixin';
import gameService from '@/services/game';

@Component
export default class GameCreate extends Mixins(UserMixin) {
  async createGame(): Promise<void> {
    if (!this.user) {
      throw Error('Cannot create game without an authenticated user');
    }
    const game: Game = {
      maxPlayers: 7,
      hasStarted: false,
      hostId: this.user.uid,
      hostPhotoURL: this.user.photoURL,
      safeForWork: false,
      reverseRoundFrequency: 0,
      pointsToWin: 7,
    };

    const gameId = await gameService.create(game);
    await gameService.joinGame(gameId, this.user);
    this.$router.push(`game/${gameId}`);
  }
}
</script>
