<script setup lang="ts">
import { storeToRefs } from "pinia";
import HelloWorld from "./components/HelloWorld.vue";
import { googleLogin, logout } from "./services/user";
import { useUserStore } from "./store/user";

const { user } = storeToRefs(useUserStore());
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>{{ user?.username }}</div>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <button @click="googleLogin" v-if="!user">Sign In</button>
  <button @click="logout" v-else>Sign Out</button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
