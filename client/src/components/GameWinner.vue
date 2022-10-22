<script lang="ts" setup>
import { useCategories } from "../composables/useCategories";
import { useGame } from "../composables/useGame";
import { useUser } from "../composables/useUser";
import BackgroundBox from "./base/BackgroundBox.vue";
import MemerButton from "./base/MemerButton.vue";

const props = defineProps<{ gameId: string }>();
const { gameWinner, userIsHost, nextPlayerTurn, resetGame } = useGame(props.gameId);
const { getSomeCategories } = useCategories();
const { user } = useUser();

const startNextGame = async () => {
  const newCategories = await getSomeCategories();
  resetGame(newCategories);
};
</script>

<template>
  <BackgroundBox>
    <div class="px-6 text-center">
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
      <div class="flex justify-center items-center mb-6">
        <!-- <Meme :meme="game!.winningMeme!" class="border-0 shadow-none" /> -->
      </div>

      <MemerButton v-if="userIsHost" color="teal" round outline @click="startNextGame"
        >START NEW GAME</MemerButton
      >
    </div>
  </BackgroundBox>
</template>
