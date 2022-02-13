<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGameStore } from "../store/game";

const route = useRoute();
const gameId = route.params.id as string;

const gameStore = useGameStore();
const { game, players, hand } = storeToRefs(gameStore);

onMounted(() => gameStore.trackGame(gameId));
</script>

<template>
  <div>
    GAMEROOM
    <p>Started: {{ game?.hasStarted }}</p>
  </div>
</template>

<style></style>
