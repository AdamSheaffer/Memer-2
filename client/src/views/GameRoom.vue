<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGameStore } from "../store/game";

const { game } = storeToRefs(useGameStore());
</script>

<template>
  <div>
    GAMEROOM
    <p>Started: {{ game?.hasStarted }}</p>
  </div>
</template>

<style></style>
