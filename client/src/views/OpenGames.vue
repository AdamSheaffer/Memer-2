<script setup lang="ts">
import { onUnmounted } from "vue";
import OpenGamesList from "../components/OpenGamesList.vue";
import { useOpenGames } from "../composeables/useOpenGames";

const { openGames, unsubscribe } = useOpenGames();
onUnmounted(() => unsubscribe());
</script>

<template>
  <div>
    <h1>Open Games</h1>
    <ul>
      <OpenGamesList v-for="game in openGames" :key="game.uid" :game="game" />
    </ul>
    <div v-if="!openGames.length">
      There are currently no open games.
      <div>
        <router-link to="/create">Create a new game</router-link>
      </div>
    </div>
  </div>
</template>

<style></style>
