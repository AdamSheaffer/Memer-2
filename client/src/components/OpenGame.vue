<script setup lang="ts">
import { Game } from "../../../types";

const props = defineProps<{ game: Game }>();
const emits = defineEmits<(event: "join", gameId: string) => void>();
</script>

<template>
  <li>
    <span>
      {{ props.game.uid }}
    </span>
    <button @click="emits('join', props.game.uid!)">Join</button>
  </li>
</template>

<style></style>
