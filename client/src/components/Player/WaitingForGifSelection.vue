<script lang="ts" setup>
import { useGame } from "../../composables/useGame";
import GameBoard from "../base/GameBoard.vue";
import Hand from "../Hand.vue";

const props = defineProps<{ gameId: string }>();

const { game } = useGame(props.gameId);
</script>

<template>
  <GameBoard>
    <div class="flex flex-col items-center justify-between h-full">
      <div class="flex flex-1 items-center">
        <div class="text-center">
          <h2 class="text-white mb-2 text-shadow-purple text-3xl lg:text-5xl xl:text-7xl">
            WAITING FOR GIF
          </h2>
          <h4
            class="text-xs lg:text-md xl:text-lg font-['Antonio'] text-gold-400 tracking-widest text-shadow-sm"
          >
            THE CATEGORY IS <span class="text-teal-500">{{ game?.tagSelection }}</span>
          </h4>
        </div>
      </div>
      <Hand :game-id="gameId" :playable="false" />
    </div>
  </GameBoard>
</template>
