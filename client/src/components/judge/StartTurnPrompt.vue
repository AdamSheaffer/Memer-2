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
  <GameBoard />
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    <div class="text-white text-2xl md:text-4xl font-['Antonio'] mb-6 text-shadow-lg">
      👋 HEY <span class="text-teal-400">{{ currentPlayer?.username }}</span
      >! IT'S YOUR TURN
    </div>
    <MemerButton
      color="teal"
      class="py-2 md:py-4 tracking-widest w-36 md:w-52 rounded-full shadow-2xl"
      data-start-turn-button
      :disabled="isLoading"
      @click="startTurn"
    >
      START TURN
    </MemerButton>
  </div>
</template>
