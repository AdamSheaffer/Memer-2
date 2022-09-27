<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { useGame } from "../composeables/useGame";
import Button from "./base/Button.vue";

const props = defineProps<{ gameId: string }>();
const { activePlayers } = useGame(props.gameId);
const hasMinimumPlayers = computed(() => activePlayers.value.length >= 3);
</script>

<template>
  <Button :disabled="hasMinimumPlayers">START GAME</Button>
</template>
