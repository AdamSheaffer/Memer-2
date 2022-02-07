<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { googleLogin } from "./services/user";

const signIn = async () => {
  const creds = await googleLogin();
  console.log(creds);
};
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <button @click="signIn">Sign In</button>
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
