<script lang="ts" setup>
import { useGame } from "../../composables/useGame";
import GameBoard from "../base/GameBoard.vue";
import Hand from "../Hand.vue";

const props = defineProps<{ gameId: string }>();

const { judge, game } = useGame(props.gameId);
</script>

<template>
  <GameBoard>
    <div class="flex flex-col items-center justify-between h-full">
      <div class="flex flex-1 items-center">
        <div class="text-center">
          <h2 class="text-white mb-2 text-shadow-purple text-3xl lg:text-5xl xl:text-7xl">
            WAITING FOR CATEGORY
          </h2>
          <h4
            class="text-xs lg:text-md xl:text-lg font-['Antonio'] text-gold-400 tracking-widest text-shadow-sm mb-6"
          >
            <span class="text-teal-500">{{ judge?.username }}</span> IS PICKING FROM THESE
            CATEGORIES
          </h4>
          <div class="text-left flex justify-center">
            <ul
              class="flex flex-col space-y-2 text-purple-400 text-shadow text-lg lg:text-xl xl:text-3xl opacity-60"
            >
              <li v-for="option in game?.tagOptions" :key="option">
                {{ option }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <Hand :game-id="gameId" :playable="false" />
      </div>
    </div>
  </GameBoard>
</template>
