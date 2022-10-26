<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { useCategories } from "../composables/useCategories";
import { useGame } from "../composables/useGame";
import { useUser } from "../composables/useUser";
import BackgroundBox from "./base/BackgroundBox.vue";
import MemerButton from "./base/MemerButton.vue";
import Meme from "./Meme.vue";

const props = defineProps<{ gameId: string }>();
const { roundWinner, game, nextPlayerTurn, resetRound } = useGame(props.gameId);
const { getSomeCategories } = useCategories();
const { user } = useUser();

const currentPlayerIsWinner = computed(() => {
  return roundWinner.value?.uid === user.value?.uid;
});

const headerText = computed(() => {
  return currentPlayerIsWinner.value ? "🏆 YOU WON THE ROUND! 🏆" : "🏆 WINS THE ROUND 🏆";
});

const currentPlayerIsNextJudge = computed(() => {
  return nextPlayerTurn.value?.uid === user.value?.uid;
});

const startNextTurn = async () => {
  const newCategories = await getSomeCategories();
  resetRound(newCategories);
};
</script>

<template>
  <BackgroundBox>
    <div class="px-6 text-center">
      <h2 class="text-2xl lg:text-4xl xl:text-5xl mb-3"></h2>
      <h2
        v-if="!currentPlayerIsWinner"
        class="text-purple-400 text-shadow text-3xl lg:text-5xl xl:text-6xl mb-1 -rotate-6 animate-fade-in-down"
      >
        {{ roundWinner?.username }}
      </h2>
      <h2
        class="text-slate-200 text-center text-shadow-purple text-lg lg:text-2xl xl:text-3xl mb-6"
      >
        {{ headerText }}
      </h2>
      <div class="flex justify-center items-center mb-6">
        <Meme :meme="game!.winningMeme!" class="border-0 shadow-none" />
      </div>
      <div v-if="currentPlayerIsNextJudge">
        <h4
          class="text-xs lg:text-sm 2xl:text-base text-center font-['Antonio'] text-gold-400 tracking-widest text-shadow-md mb-6"
        >
          👋 HEY <span class="text-teal-400">{{ user?.username }}</span
          >! IT'S YOUR TURN NEXT
        </h4>
        <MemerButton round color="teal" outline @click="startNextTurn" class="mb-4">
          START ROUND
        </MemerButton>
      </div>
      <h4
        v-else
        class="text-xs lg:text-sm 2xl:text-base text-center font-['Antonio'] text-gold-400 tracking-widest text-shadow-md mb-6"
      >
        WAITING ON <span class="text-teal-400">{{ nextPlayerTurn?.username }}</span> TO START THE
        NEXT ROUND
      </h4>
    </div>
  </BackgroundBox>
</template>
