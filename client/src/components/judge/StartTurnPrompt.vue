<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { useCategories } from "../../composables/useCategories";
import { useGame } from "../../composables/useGame";
import GameBoard from "../base/GameBoard.vue";

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
    <div class="text-white text-4xl font-['Antonio'] mb-6 text-shadow-lg">
      👋 HEY <span class="text-teal-400">{{ currentPlayer?.username }}</span
      >! IT'S YOUR TURN
    </div>
    <button
      class="bg-teal-500 py-4 text-white tracking-widest w-52 rounded-full shadow-2xl cursor-pointer hover:bg-teal-400 border-2 border-teal-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-500"
      data-start-turn-button
      :disabled="isLoading"
      @click="startTurn"
    >
      START TURN
    </button>
  </div>
</template>

<style scoped></style>
