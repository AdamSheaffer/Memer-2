<script lang="ts" setup>
import { useGame } from "../../composables/useGame";
import GameBoard from "../base/GameBoard.vue";

const props = defineProps<{ gameId: string }>();

const { game, isReverseRound } = useGame(props.gameId);
</script>

<template>
  <GameBoard>
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <img
          v-if="!isReverseRound"
          :src="game!.memeTemplate!.photoURL!"
          :alt="`Meme template photo for ${game!.tagSelection}`"
          class="mx-auto block object-cover h-48 w-64 xl:h-52 xl:w-72 2xl:h-72 2xl:w-96 rounded-xl border-4 md:border-8 border-purple-400 mb-16 shadow-lg"
        />
        <div class="text-center">
          <h2
            class="text-white mt-8 text-shadow-purple text-2xl md:text-4xl lg:text-6xl xl:text-7xl"
          >
            AND NOW WE WAIT
          </h2>
          <h4
            class="text-sm md:text-lg font-['Antonio'] text-gold-400 tracking-widest text-shadow-md"
          >
            OTHER PLAYERS ARE SUBMITTING THEIR CAPTIONS
          </h4>
        </div>
      </div>
    </div>
  </GameBoard>
</template>
