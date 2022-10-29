<script setup lang="ts">
import JudgeRound from "../components/Judge/JudgeRound.vue";
import { useGame } from "../composables/useGame";
// import JudgeRound from "./Judge/JudgeRound.vue";
import PlayerRound from "./Player/PlayerRound.vue";
import PreGameDisplay from "./PreGameDisplay.vue";

const props = defineProps<{ gameId: string }>();
const { game, isYourTurn } = useGame(props.gameId);
</script>

<template>
  <div class="h-full w-full relative pat">
    <PreGameDisplay v-if="!game?.hasStarted" :game-id="gameId" />
    <div v-else class="h-full w-full">
      <JudgeRound v-if="isYourTurn" :game-id="props.gameId" />
      <PlayerRound v-else :game-id="props.gameId" />
    </div>
  </div>
</template>

<style scoped></style>
