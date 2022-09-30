<script setup lang="ts">
import { useGame } from "../composeables/useGame";
import StartButton from "./StartButton.vue";

const props = defineProps<{ gameId: string }>();

const { game, userIsHost } = useGame(props.gameId);
</script>

<template>
  <div>
    GAMEAREA
    <pre>{{ game }}</pre>
    <StartButton v-if="userIsHost" :game-id="gameId" />
  </div>
</template>
