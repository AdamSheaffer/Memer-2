<template>
  <gameroom-background class="home">
    <div class="home-container">
      <div class="home-container-content">
        <avatar class="avatar" :imageURL="user.photoURL"/>
        <h1 class="has-text-white is-size-3 has-text-centered">
          WELCOME BACK {{ user.username.toUpperCase() }}
        </h1>
        <div class="action-buttons">
          <b-button type="is-primary" inverted class="my-3" expanded>
            JOIN GAME
          </b-button>
          <b-button type="is-primary" inverted class="my-3" expanded>
            CREATE NEW GAME
          </b-button>
          <b-button type="is-primary" outlined class="my-3" expanded @click="signOut">
            LOGOUT
          </b-button>
        </div>
        Available Games
        <open-game-list :games="games" @join="join" />
      </div>
    </div>
  </gameroom-background>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { googleSignIn, signOut, db } from '@/firebase';
import UserMixin from '@/mixins/UserMixin';
import { Game } from '@/types/Game';
import OpenGameList from '@/components/OpenGameList.vue';
import GameroomBackground from '@/components/GameroomBackground.vue';
import Avatar from '@/components/Avatar.vue';
import gameService from '@/services/game';

@Component({
  components: { OpenGameList, GameroomBackground, Avatar },
})
export default class Home extends Mixins(UserMixin) {
  @State playersOnline!: number

  games: Game[] = []

  openGameUnsubscribe?: () => void

  mounted(): void {
    const openGames = db.collection('games').where('hasStarted', '==', false);
    this.openGameUnsubscribe = openGames.onSnapshot((snapshot) => {
      this.games = snapshot.docs.map((d) => d.data() as Game);
    });
  }

  destroyed(): void {
    if (this.openGameUnsubscribe) this.openGameUnsubscribe();
  }

  async join(gameId: string): Promise<void> {
    if (!this.user) {
      throw Error('Cannot join game while unauthenticated');
    }
    await gameService.joinGame(gameId, this.user);
    this.$router.push(`game/${gameId}`);
  }

  async signIn(): Promise<void> {
    await googleSignIn();
  }

  async signOut(): Promise<void> {
    await signOut();
    this.$router.push('/login');
  }
}
</script>

<style scoped lang="scss">
.home {
  height: 100%;
}
.home-container {
  display: grid;
  grid-template-columns: 1fr 80% 1fr;
  grid-template-rows: 1fr 80% 1fr;
  grid-template-columns: 1fr 90% 1fr;
  align-items: center;
  justify-items: center;
  height: 100%;
  width: 100%;
}
.home-container-content {
  grid-column-start: 2;
  grid-row-start: 2;
  width: clamp(300px, 70%, 450px);
}
.avatar {
  margin-left: auto;
  margin-right: auto;
}
</style>
