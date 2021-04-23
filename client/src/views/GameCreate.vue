<template>
  <div class="home">
    <gameroom-background>
      <setup-wizard @on-complete="createGame" @on-cancel="returnToLobby" />
    </gameroom-background>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import SetupWizard from '@/components/SetupWizard.vue';
import GameroomBackground from '@/components/GameroomBackground.vue';
import { Game } from '@/types/Game';
import UserMixin from '@/mixins/UserMixin';
import gameService from '@/services/game';

@Component({
  components: { SetupWizard, GameroomBackground },
})
export default class GameCreate extends Mixins(UserMixin) {
  async createGame(gameSettings: Game): Promise<void> {
    if (!this.user) {
      throw Error('Cannot create game without an authenticated user');
    }

    const game: Game = {
      ...gameSettings,
      hasStarted: false,
      hostId: this.user.uid,
      hostPhotoURL: this.user.photoURL,
      tagOptions: [],
      tagSelection: null,
    };

    const gameId = await gameService.create(game);
    await gameService.joinGame(gameId, this.user);
    this.$router.push(`game/${gameId}`);
  }

  returnToLobby(): void {
    this.$router.push('/');
  }
}
</script>
