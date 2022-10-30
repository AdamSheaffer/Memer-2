<script lang="ts" setup>
import { useGame } from "../../composables/useGame";
import { reverse } from "../../services/icons";
import GameBoard from "../base/GameBoard.vue";
import Hand from "../Hand.vue";

const props = defineProps<{ gameId: string }>();

const { judge } = useGame(props.gameId);
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
            <span class="text-teal-500">{{ judge?.username }}</span> PICKS A CAPTION AND YOU'LL
            SUPPLY A GIF
          </h4>
        </div>
      </div>
      <div>
        <Hand :game-id="gameId" />
      </div>
    </div>
  </GameBoard>
</template>
