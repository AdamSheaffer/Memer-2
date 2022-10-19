<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { useCategories } from "../../composables/useCategories";
import { useGame } from "../../composables/useGame";
import GameBoard from "../base/GameBoard.vue";
import MemerButton from "../base/MemerButton.vue";

const props = defineProps<{ gameId: string }>();

const { getSomeCategories } = useCategories();
const { updateGame, currentPlayer } = useGame(props.gameId);

const isLoading = ref(false);

const startTurn = async () => {
  isLoading.value = true;
  const categories = await getSomeCategories();
  await updateGame({ tagOptions: categories });
  isLoading.value = false;
};
</script>

<template>
  <GameBoard>
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <div class="text-white text-2xl md:text-4xl font-['Antonio'] mb-6 text-shadow-lg">
          👋 HEY <span class="text-teal-400">{{ currentPlayer?.username }}</span
          >! IT'S YOUR TURN
        </div>
        <MemerButton
          color="teal"
          round
          class="py-2 md:py-4 tracking-widest w-36 md:w-52 shadow-2xl"
          data-start-turn-button
          :disabled="isLoading"
          @click="startTurn"
        >
          START TURN
        </MemerButton>
      </div>
    </div>
  </GameBoard>
</template>
