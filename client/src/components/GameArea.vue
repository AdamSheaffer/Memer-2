<script setup lang="ts">
import { useGame } from "../composeables/useGame";
import Button from "./base/Button.vue";

const props = defineProps<{ gameId: string }>();

const { game } = useGame(props.gameId);
</script>

<template>
  <div>
    GAMEAREA
    <pre>{{ game }}</pre>
    <Button>Start Game</Button>
  </div>
</template>
