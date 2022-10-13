<script lang="ts" setup>
import { useGame } from "../../composables/useGame";
import PickCategory from "./PickCategory.vue";
import PickGif from "./PickGif.vue";
import SelectRoundWinner from "./SelectRoundWinner.vue";
import StartTurnPrompt from "./StartTurnPrompt.vue";
import WaitingForSubmissions from "./WaitingForSubmissions.vue";

const props = defineProps<{ gameId: string }>();

const {
  judgeShouldStartTurn,
  judgeIsPickingCategory,
  judgeIsPickingGif,
  isSubmissionRound,
  isPickingWinner,
} = useGame(props.gameId);
</script>

<template>
  <StartTurnPrompt v-if="judgeShouldStartTurn" :game-id="gameId" />
  <PickCategory v-else-if="judgeIsPickingCategory" :game-id="gameId" />
  <PickGif v-else-if="judgeIsPickingGif" :game-id="gameId" />
  <WaitingForSubmissions v-else-if="isSubmissionRound" :game-id="gameId" />
  <!-- Submission showcase (All players see this) -->
  <SelectRoundWinner v-if="isPickingWinner" :game-id="gameId" />
  <!-- Round winner display (All players see this) -->
</template>

<style scoped></style>
