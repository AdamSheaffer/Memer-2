<script setup lang="ts">
import JudgeRound from "../components/judge/JudgeRound.vue";
import { useGame } from "../composables/useGame";
import PreGameDisplay from "./PreGameDisplay.vue";

const props = defineProps<{ gameId: string }>();
const { game, isYourTurn } = useGame(props.gameId);
</script>

<template>
  <div class="bg-darkblue-300 h-full relative">
    <JudgeRound v-if="isYourTurn" :game-id="props.gameId" />

    <PreGameDisplay v-if="!game?.hasStarted" :game-id="gameId" />
  </div>
</template>
