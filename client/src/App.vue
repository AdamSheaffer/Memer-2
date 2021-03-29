<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/create">New Game</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace, Mutation } from 'vuex-class';
import { auth, realtimeDb } from '@/firebase';
import { User } from '@/types/User';
import handleSignIn from '@/services/auth';
import { detectOnlinePresence } from '@/services/onlineDetection';

const userStore = namespace('user');

@Component
export default class App extends Vue {
  @userStore.Mutation
  public setUser!: (u: User | null) => void

  @Mutation setPlayersOnline!: (count: number) => void;

  created(): void {
    this.trackOnlinePlayers();
    auth.onAuthStateChanged(async (newUserState) => {
      if (!newUserState) {
        this.setUser(null);
      } else {
        const profile = await handleSignIn(newUserState);
        detectOnlinePresence(profile.uid);
        this.setUser(profile);
      }
    });
  }

  trackOnlinePlayers(): void {
    realtimeDb.ref('playersOnline').on('value', (snapshot) => {
      this.setPlayersOnline(snapshot.val());
    });
  }
}
</script>

<style lang="scss">
@import '@/styles/_global.scss';
</style>
