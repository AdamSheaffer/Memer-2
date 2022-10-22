<script lang="ts" setup>
import { useGame } from "../../composables/useGame";
import GameWinner from "../GameWinner.vue";
import RoundWinner from "../RoundWinner.vue";
import PickCategory from "./PickCategory.vue";
import PickGif from "./PickGif.vue";
import PickReverseRoundCaption from "./PickReverseRoundCaption.vue";
import SelectRoundWinner from "./SelectRoundWinner.vue";
import StartTurnPrompt from "./StartTurnPrompt.vue";
import WaitingForSubmissions from "./WaitingForSubmissions.vue";

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
    <StartTurnPrompt v-if="judgeShouldStartTurn" :game-id="gameId" />
    <PickCategory v-else-if="judgeIsPickingCategory" :game-id="gameId" />
    <PickGif v-else-if="judgeIsPickingGif" :game-id="gameId" />
    <WaitingForSubmissions v-else-if="isSubmissionRound" :game-id="gameId" />
    <SelectRoundWinner v-if="isPickingWinner" :game-id="gameId" />
    <RoundWinner v-if="roundWinner && !gameWinner" :game-id="gameId" />
    <GameWinner v-if="gameWinner" :game-id="gameId" />
  </div>
  <div v-else class="h-full w-full">
    <PickReverseRoundCaption v-if="judgeIsPickingReverseRoundCaption" :game-id="gameId" />
  </div>
</template>
