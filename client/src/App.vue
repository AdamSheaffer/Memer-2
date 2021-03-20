<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { auth } from '@/firebase';
import { User } from '@/store/user/types';

const userStore = namespace('user');

@Component
export default class App extends Vue {
  @userStore.Mutation
  public setUser!: (u: User | null) => void

  created(): void {
    auth.onAuthStateChanged((newUserState) => {
      if (!newUserState) {
        this.setUser(null);
      } else {
        const { displayName, uid, photoURL } = newUserState;
        this.setUser({
          uid,
          photoURL,
          fullName: displayName,
          username: displayName,
        });
      }
    });
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
