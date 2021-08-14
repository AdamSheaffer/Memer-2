<template>
  <gameroom-background class="home">
    <div v-if="isLoggedIn" class="home-container">
      <div class="home-container-content">
        <div v-if="!showOpenGames">
          <avatar class="avatar" :imageURL="user.photoURL"/>
          <h1 class="has-text-white is-size-3 has-text-centered mt-2">
            WELCOME BACK {{ user.username.toUpperCase() }}
          </h1>
          <div class="action-buttons">
            <b-button
              @click="showOpenGames = true"
              size="is-medium"
              type="is-primary"
              inverted
              class="my-3"
              expanded>
              FIND GAME
            </b-button>
            <b-button
              tag="router-link"
              to="/create"
              type="is-primary"
              inverted
              size="is-medium"
              class="my-3"
              expanded
            >
              HOST NEW GAME
            </b-button>
            <b-button
              size="is-medium"
              type="is-primary"
              outlined
              class="my-3"
              expanded
              @click="signOut"
            >
              LOGOUT
            </b-button>
          </div>
        </div>
        <transition name="slide-fade">
          <div v-if="showOpenGames" class="open-games">
            <open-game-list :games="games" @join="join" />
            <divider class="px-6 pt-3" text="or" />
            <b-button
              tag="router-link"
              to="/create"
              type="is-primary"
              size="is-medium"
              class="my-3"
              expanded
            >
              HOST NEW GAME
            </b-button>
            <b-button
              size="is-medium"
              type="is-primary"
              inverted
              class="my-3"
              expanded
              @click="signOut"
            >
              LOGOUT
            </b-button>
          </div>
        </transition>
      </div>
    </div>
    <b-image
      class="dog-logo is-hidden-mobile"
      :src="require('@/assets/dogologo.svg')"
      alt="Memer Logo"
    />
  </gameroom-background>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { State, namespace } from 'vuex-class';
import { googleSignIn, signOut, db } from '@/firebase';
import UserMixin from '@/mixins/UserMixin';
import { Game } from '@/types/Game';
import OpenGameList from '@/components/OpenGameList.vue';
import GameroomBackground from '@/components/GameroomBackground.vue';
import Divider from '@/components/Divider.vue';
import Avatar from '@/components/Avatar.vue';
import gameService from '@/services/game';

const gameStore = namespace('game');

@Component({
  components: {
    OpenGameList, GameroomBackground, Avatar, Divider,
  },
})
export default class Home extends Mixins(UserMixin) {
  @State playersOnline!: number

  games: Game[] = []

  openGameUnsubscribe?: () => void

  showOpenGames = false

  mounted(): void {
    const openGames = db.collection('games')
      .where('hasStarted', '==', false)
      .limit(5);
    this.openGameUnsubscribe = openGames.onSnapshot((snapshot) => {
      this.games = snapshot.docs.map((d) => d.data() as Game);
    });
  }

  destroyed(): void {
    if (this.openGameUnsubscribe) this.openGameUnsubscribe();
  }

  @gameStore.Mutation
  clearGameData!: () => void;

  async join(gameId: string): Promise<void> {
    if (!this.user) {
      throw Error('Cannot join game while unauthenticated');
    }

    this.clearGameData();

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
@import '../styles/_variables';

.home {
  height: 100%;
}
.home-container {
  display: grid;
  grid-template-columns: 1fr 80% 1fr;
  grid-template-rows: 1fr 50% 1fr;
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
  align-self: baseline;
}
.avatar {
  margin-left: auto;
  margin-right: auto;
}
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all .8s ease-in;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(80px);
  opacity: 0;
}

.dog-logo {
  @include absolute-doggo(25%);
}
</style>
