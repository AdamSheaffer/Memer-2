<script lang="ts" setup>
import { useGame } from "../../composables/useGame";
import GameWinner from "../GameWinner.vue";
import RoundWinner from "../RoundWinner.vue";
import SubmitCaption from "./SubmitCaption.vue";
import WaitingForCategorySelection from "./WaitingForCategorySelection.vue";
import WaitingForGifSelection from "./WaitingForGifSelection.vue";
import WaitingForReverseRoundCaption from "./WaitingForReverseRoundCaption.vue";
import WaitingForTurnStart from "./WaitingForTurnStart.vue";
import WaitingForWinnerSelection from "./WaitingForWinnerSelection.vue";

const props = defineProps<{ gameId: string }>();

const {
  judgeShouldStartTurn,
  judgeIsPickingCategory,
  judgeIsPickingGif,
  judgeIsPickingReverseRoundCaption,
  isSubmissionRound,
  isPickingWinner,
  isReverseRound,
  roundWinner,
  gameWinner,
} = useGame(props.gameId);
</script>

<template>
  <div v-if="!isReverseRound" class="h-full w-full">
    <WaitingForTurnStart v-if="judgeShouldStartTurn" :game-id="gameId" />
    <WaitingForCategorySelection v-if="judgeIsPickingCategory" :game-id="gameId" />
    <WaitingForGifSelection v-if="judgeIsPickingGif" :game-id="gameId" />
    <SubmitCaption v-if="isSubmissionRound" :game-id="gameId" />
    <WaitingForWinnerSelection v-if="isPickingWinner" :game-id="gameId" />
    <RoundWinner v-if="roundWinner && !gameWinner" :game-id="gameId" />
    <GameWinner v-if="gameWinner" :game-id="gameId" />
  </div>
  <div v-else class="h-full w-full">
    <WaitingForReverseRoundCaption v-if="judgeIsPickingReverseRoundCaption" :game-id="gameId" />
  </div>
</template>
