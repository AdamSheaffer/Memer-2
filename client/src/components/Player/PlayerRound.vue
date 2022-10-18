<script lang="ts" setup>
import { useGame } from "../../composables/useGame";
import RoundWinner from "../RoundWinner.vue";
import SubmitCaption from "./SubmitCaption.vue";
import WaitingForCategorySelection from "./WaitingForCategorySelection.vue";
import WaitingForGifSelection from "./WaitingForGifSelection.vue";
import WaitingForTurnStart from "./WaitingForTurnStart.vue";
import WaitingForWinnerSelection from "./WaitingForWinnerSelection.vue";

const props = defineProps<{ gameId: string }>();

const {
  judgeShouldStartTurn,
  judgeIsPickingCategory,
  judgeIsPickingGif,
  isSubmissionRound,
  isPickingWinner,
  roundWinner,
} = useGame(props.gameId);
</script>

<template>
  <WaitingForTurnStart v-if="judgeShouldStartTurn" :game-id="gameId" />
  <WaitingForCategorySelection v-if="judgeIsPickingCategory" :game-id="gameId" />
  <WaitingForGifSelection v-if="judgeIsPickingGif" :game-id="gameId" />
  <SubmitCaption v-if="isSubmissionRound" :game-id="gameId" />
  <WaitingForWinnerSelection v-if="isPickingWinner" :game-id="gameId" />
  <RoundWinner v-if="roundWinner" :game-id="gameId" />
</template>
