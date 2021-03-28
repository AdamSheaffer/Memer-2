<template>
  <div class="home">
    <p v-if="isLoggedIn">{{user.username}}</p>
    <p>Players Online: {{playersOnline}}</p>
    <b-button v-if="!isLoggedIn" @click="signIn">LOGIN</b-button>
    <b-button v-else @click="signOut">LOGOUT</b-button>
    Available Games
    <open-game-list :games="games" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { googleSignIn, signOut, db } from '@/firebase';
import UserMixin from '@/mixins/UserMixin';
import { Game } from '@/types/Game';
import OpenGameList from '@/components/OpenGameList.vue';

@Component({
  components: { OpenGameList },
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

  destroy(): void {
    if (this.openGameUnsubscribe) this.openGameUnsubscribe();
  }

  async signIn(): Promise<void> {
    await googleSignIn();
  }

  async signOut(): Promise<void> {
    return signOut();
  }
}
</script>
