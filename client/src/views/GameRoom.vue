<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGameStore } from "../store/game";
import { useUserStore } from "../store/user";

const { user } = useUserStore();

const route = useRoute();
const gameId = route.params.id as string;

const gameStore = useGameStore();
const { game, players, hand } = storeToRefs(gameStore);

onMounted(() => gameStore.initialize(gameId, user!));
</script>

<template>
  <div>
    GAMEROOM
    <p>Started: {{ game?.hasStarted }}</p>
  </div>
</template>

<style></style>
