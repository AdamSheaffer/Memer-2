<template>
  <div class="home">
    <p>{{username}}</p>
    <b-button v-if="!isLoggedIn" @click="signIn">LOGIN</b-button>
    <b-button v-else @click="signOut">LOGOUT</b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { googleSignIn, signOut } from '@/firebase';

const userStore = namespace('user');

@Component
export default class Home extends Vue {
  @userStore.Getter
  public isLoggedIn!: boolean

  @userStore.State((state) => state.user?.username)
  public username!: string

  async signIn(): Promise<void> {
    await googleSignIn();
  }

  async signOut(): Promise<void> {
    return signOut();
  }
}
</script>
