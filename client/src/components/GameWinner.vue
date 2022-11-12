<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useCategories } from "../composables/useCategories";
import { useGame } from "../composables/useGame";
import { useUser } from "../composables/useUser";
import BackgroundBox from "./base/BackgroundBox.vue";
import MemerButton from "./base/MemerButton.vue";
import Meme from "./Meme.vue";

const props = defineProps<{ gameId: string }>();
const { game, gameWinner, userIsHost, resetGame } = useGame(props.gameId);
const { user } = useUser();
const { getSomeCategories } = useCategories();

const showMeme = ref(true);

onMounted(() => {
  setTimeout(() => {
    showMeme.value = false;
  }, 5000);
});

const startNextGame = async () => {
  const newCategories = await getSomeCategories();
  resetGame(newCategories);
};

const currentPlayerIsWinner = computed(() => {
  return gameWinner.value?.uid === user.value?.uid;
});

const headerText = computed(() => {
  return currentPlayerIsWinner.value ? "🏆 YOU WON THE ROUND! 🏆" : "🏆 WINS THE ROUND 🏆";
});
</script>

<template>
  <BackgroundBox>
    <div class="px-6 text-center">
      <div v-if="showMeme">
        <h2 class="text-2xl lg:text-4xl xl:text-5xl mb-3"></h2>
        <h2
          v-if="!currentPlayerIsWinner"
          class="text-purple-400 text-shadow text-3xl lg:text-5xl xl:text-6xl mb-1 -rotate-6 animate-fade-in-down"
        >
          {{ gameWinner?.username }}
        </h2>
        <h2
          class="text-slate-200 text-center text-shadow-purple text-lg lg:text-2xl xl:text-3xl mb-6"
        >
          {{ headerText }}
        </h2>
        <div class="flex justify-center items-center mb-6">
          <Meme :meme="game!.winningMeme!" class="border-0 shadow-none" />
        </div>
      </div>

      <div v-else>
        <div class="translate-y-3">
          <h1 class="text-5xl translate-y-9">👑</h1>
          <img :src="gameWinner!.photoURL!" :alt="gameWinner!.username!" class="h-36 mx-auto" />
        </div>
        <h2
          class="text-purple-400 text-shadow text-3xl lg:text-57xl xl:text-8xl mb-1 -rotate-6 animate-fade-in-down"
        >
          {{ gameWinner?.username }}
        </h2>
        <h2
          class="text-slate-200 text-center text-shadow-purple text-xl lg:text-3xl xl:text-4xl mb-6"
        >
          🏆 WINS THE GAME 🏆
        </h2>

        <MemerButton
          v-if="userIsHost"
          color="teal"
          round
          outline
          sound="affirmative"
          @click="startNextGame"
          >START NEW GAME</MemerButton
        >
      </div>
    </div>
  </BackgroundBox>
</template>
