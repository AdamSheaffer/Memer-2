<script setup lang="ts">
import { useGame } from "../composeables/useGame";
import JudgeRound from "./judge/JudgeRound.vue";
import StartButton from "./StartButton.vue";

const props = defineProps<{ gameId: string }>();

const { game, userIsHost, isYourTurn } = useGame(props.gameId);
</script>

<template>
  <div>
    <pre>{{ game }}</pre>

    <JudgeRound v-if="isYourTurn" :game-id="props.gameId" />

    <StartButton v-if="userIsHost && !game?.hasStarted" :game-id="gameId" />
  </div>
</template>
