<script lang="ts" setup>
import { useGame } from "../../composables/useGame";

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
    <!-- <StartTurnPrompt v-if="judgeShouldStartTurn" :game-id="gameId" />
    <PickCategory v-else-if="judgeIsPickingCategory" :game-id="gameId" />
    <PickGif v-else-if="judgeIsPickingGif" :game-id="gameId" />
    <WaitingForSubmissions v-else-if="isSubmissionRound" :game-id="gameId" />
    <SelectRoundWinner v-else-if="isPickingWinner" :game-id="gameId" />
    <RoundWinner v-else-if="roundWinner && !gameWinner" :game-id="gameId" />
    <GameWinner v-else-if="gameWinner" :game-id="gameId" /> -->
  </div>
  <div v-else class="h-full w-full">
    <!-- <PickReverseRoundCaption v-if="judgeIsPickingReverseRoundCaption" :game-id="gameId" />
    <WaitingForSubmissions v-else-if="isSubmissionRound" :game-id="gameId" />
    <SelectRoundWinner v-else-if="isPickingWinner" :game-id="gameId" />
    <RoundWinner v-else-if="roundWinner && !gameWinner" :game-id="gameId" />
    <GameWinner v-else-if="gameWinner" :game-id="gameId" /> -->
  </div>
</template>
