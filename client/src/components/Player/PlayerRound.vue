<script lang="ts" setup>
import { defineAsyncComponent } from "vue";
import { useGame } from "../../composables/useGame";
import GameWinner from "../GameWinner.vue";
import RoundWinner from "../RoundWinner.vue";
import SubmitCaption from "./SubmitCaption.vue";
import WaitingForCategorySelection from "./WaitingForCategorySelection.vue";
import WaitingForGifSelection from "./WaitingForGifSelection.vue";
import WaitingForReverseRoundCaption from "./WaitingForReverseRoundCaption.vue";
import WaitingForTurnStart from "./WaitingForTurnStart.vue";
import WaitingForWinnerSelection from "./WaitingForWinnerSelection.vue";

const SubmitGif = defineAsyncComponent(() => import("./SubmitGif.vue"));

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
    <WaitingForCategorySelection v-else-if="judgeIsPickingCategory" :game-id="gameId" />
    <WaitingForGifSelection v-else-if="judgeIsPickingGif" :game-id="gameId" />
    <SubmitCaption v-else-if="isSubmissionRound" :game-id="gameId" />
    <WaitingForWinnerSelection v-else-if="isPickingWinner" :game-id="gameId" />
    <RoundWinner v-else-if="roundWinner && !gameWinner" :game-id="gameId" />
    <GameWinner v-else-if="gameWinner" :game-id="gameId" />
  </div>
  <div v-else class="h-full w-full">
    <WaitingForReverseRoundCaption v-if="judgeIsPickingReverseRoundCaption" :game-id="gameId" />
    <SubmitGif v-else-if="isSubmissionRound" :game-id="gameId" />
    <WaitingForWinnerSelection v-else-if="isPickingWinner" :game-id="gameId" />
    <RoundWinner v-else-if="roundWinner && !gameWinner" :game-id="gameId" />
    <GameWinner v-else-if="gameWinner" :game-id="gameId" />
  </div>
</template>
