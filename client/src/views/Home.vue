<script setup lang="ts">
import { storeToRefs } from "pinia";
import { googleLogin, logout } from "../services/user";
import { useUserStore } from "../store/user";

const { user } = storeToRefs(useUserStore());
</script>

<template>
  <div>
    <h1>Home</h1>
    <div v-if="user">
      <p>Welcome {{ user.username }}</p>
      <router-link to="/create">Create Game</router-link>
      <router-link to="/open-games">Join Game</router-link>
      <button @click="logout">Sign Out</button>
    </div>
    <div v-else>
      <button @click="googleLogin">Sign In</button>
    </div>
  </div>
</template>

<style></style>
