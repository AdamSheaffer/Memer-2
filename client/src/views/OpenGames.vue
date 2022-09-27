<script setup lang="ts">
import { useRouter } from "vue-router";
import OpenGamesList from "../components/OpenGamesList.vue";
import { useOpenGames } from "../composeables/useOpenGames";

const { openGames, loading } = useOpenGames();
const router = useRouter();

const goToGameRoom = (gameId: string) => router.push(`/game/${gameId}`);
</script>

<template>
  <div>
    <h1>Open Games</h1>
    <ul>
      <OpenGamesList v-for="game in openGames" :key="game.uid" :game="game" @join="goToGameRoom" />
    </ul>
    <div v-if="!loading && !openGames.length">
      There are currently no open games.
      <div>
        <router-link to="/create">Create a new game</router-link>
      </div>
    </div>
  </div>
</template>

<style></style>
