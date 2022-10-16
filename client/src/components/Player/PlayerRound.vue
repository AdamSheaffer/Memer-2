<script lang="ts" setup>
import { useGame } from "../../composables/useGame";
import SubmitCaption from "./SubmitCaption.vue";
import WaitingForCategorySelection from "./WaitingForCategorySelection.vue";
import WaitingForGifSelection from "./WaitingForGifSelection.vue";
import WaitingForTurnStart from "./WaitingForTurnStart.vue";

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
  <WaitingForTurnStart v-if="judgeShouldStartTurn" :game-id="gameId" />
  <WaitingForCategorySelection v-if="judgeIsPickingCategory" :game-id="gameId" />
  <WaitingForGifSelection v-if="judgeIsPickingGif" :game-id="gameId" />
  <SubmitCaption v-if="isSubmissionRound" :game-id="gameId" />
  <!-- Submission showcase (All players see this) -->
  <!-- Judge is picking winner -->
  <!-- Round winner display (All players see this) -->
</template>
