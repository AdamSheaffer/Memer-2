<script lang="ts" setup>
import { useGame } from "../composables/useGame";

const props = defineProps<{ gameId: string }>();

const { gameWinner, resetGame } = useGame(props.gameId);
</script>

<template>
  <div>{{ gameWinner?.username }} WON THE GAME</div>
</template>
