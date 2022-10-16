<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { useGame } from "../../composables/useGame";
import GameBoard from "../base/GameBoard.vue";
import Hand from "../Hand.vue";

const props = defineProps<{ gameId: string }>();

const { host } = useGame(props.gameId);

const possessiveHostName = computed(() => {
  return host.value?.username?.toUpperCase().endsWith("S")
    ? `${host.value.username}'`
    : `${host.value?.username}'S`;
});
</script>

<template>
  <GameBoard>
    <div class="flex flex-col items-center justify-between h-full">
      <div class="flex flex-1 items-center">
        <div class="text-center">
          <h2 class="text-white mb-2 text-shadow-purple text-3xl lg:text-5xl xl:text-7xl">
            WAITING FOR JUDGE
          </h2>
          <h4
            class="text-xs lg:text-md xl:text-lg font-['Antonio'] text-gold-400 tracking-widest text-shadow-sm"
          >
            IT'S <span class="text-teal-500">{{ possessiveHostName }}</span> TURN TO START THE MEME
          </h4>
        </div>
      </div>
      <div>
        <Hand :game-id="gameId" :playable="false" />
      </div>
    </div>
  </GameBoard>
</template>
