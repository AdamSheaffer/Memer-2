<script lang="ts" setup>
import { Timestamp } from "@firebase/firestore";
import { ref } from "vue";
import { Card } from "../../../../types";
import { useGame } from "../../composables/useGame";
import { useHand } from "../../composables/useHand";
import { reverse } from "../../services/icons";
import GameBoard from "../base/GameBoard.vue";
import Hand from "../Hand.vue";

const props = defineProps<{ gameId: string }>();

const { updateGame, currentPlayer } = useGame(props.gameId);
const { removeCard } = useHand(props.gameId, currentPlayer.value!.uid);

const isSaving = ref(false);

const selectCard = async (card: Card) => {
  isSaving.value = true;
  await updateGame({
    memeTemplate: {
      top: card.top,
      bottom: card.bottom,
      photoURL: null,
    },
    memeTemplateTimestamp: Timestamp.now(),
  });
  await removeCard(card.uid!);
  isSaving.value = false;
};
</script>

<template>
  <GameBoard>
    <div class="flex flex-col items-center justify-between h-full">
      <div class="flex flex-1 items-center">
        <div class="text-center">
          <FaIcon
            :icon="reverse"
            class="text-teal-500 text-8xl mb-6 animate-fade-in-spin-once"
          ></FaIcon>
          <h2 class="text-white mb-2 text-shadow-purple text-3xl lg:text-5xl xl:text-7xl">
            REVERSE ROUND!
          </h2>
          <h4
            class="text-xs lg:text-md xl:text-lg font-['Antonio'] text-gold-400 tracking-widest text-shadow-sm"
          >
            PICK ONE OF YOUR OWN CARDS AND THE OTHER PLAYERS SUPPLY THE GIF
          </h4>
        </div>
      </div>
      <Hand :game-id="gameId" @select="selectCard" :playable="!isSaving" />
    </div>
  </GameBoard>
</template>
