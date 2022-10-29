<script setup lang="ts">
import { onKeyStroke } from "@vueuse/core";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useGame } from "../composables/useGame";
import { backArrow, check, gavel, heart, users, xMark } from "../services/icons";

const props = defineProps<{ gameId: string }>();

const { activePlayers, game, currentPlayer, updatePlayer } = useGame(props.gameId);
const router = useRouter();

const isOpen = ref(false);

onKeyStroke("Escape", () => (isOpen.value = false));

const leaveGame = () => {
  router.push("/open-games");
  return updatePlayer(currentPlayer.value!.uid, { isActive: false });
};
</script>

<template>
  <button
    class="z-10 md:hidden absolute top-4 left-4 rounded-full bg-purple-400"
    title="SHOW PLAYERS"
    @click="isOpen = true"
  >
    <FaIcon :icon="users" class="text-xl p-4 text-white"></FaIcon>
  </button>
  <aside
    :class="{
      '-translate-x-full': !isOpen,
      'translate-x-0 z-10': isOpen,
    }"
    class="overflow-hidden md:translate-x-0 md:relative md:z-0 w-full md:w-72 absolute flex flex-col justify-between bg-darkblue-500 h-full px-4 py-2 transition duration-300"
  >
    <div class="flex flex-col space-y-4">
      <h1 class="text-purple-400 text-6xl text-shadow-lg mb-4 mt-2">MEMER</h1>

      <button class="absolute top-1 right-3 md:hidden">
        <FaIcon
          :icon="xMark"
          class="text-xl text-slate-400 hover:scale-x-105 hover:text-slate-200 transition-all"
          title="CLOSE"
          @click="isOpen = false"
        ></FaIcon>
      </button>

      <div v-for="player in activePlayers" :key="player.uid">
        <div class="flex space-x-4">
          <img
            :src="player.photoURL!"
            :alt="`${player.username} Avatar`"
            class="rounded-full border-2 border-gold-500 w-12"
            :class="{
              'bg-teal-500': currentPlayer?.uid !== player.uid,
              'bg-purple-400': currentPlayer?.uid === player.uid,
            }"
          />
          <div class="flex flex-col">
            <div class="flex">
              <p class="text-slate-300 font-['Antonio']">
                {{ player.username }}
                <FaIcon
                  v-if="!!player.memePlayed"
                  :icon="check"
                  class="text-teal-400"
                  title="MEME SUBMITTED"
                ></FaIcon>
              </p>
              <div v-if="game?.turn === player.uid" class="ml-2" title="ROUND JUDGE">
                <FaIcon :icon="gavel" class="text-gold-400"></FaIcon>
              </div>
            </div>
            <div class="flex space-x-0.5">
              <FaIcon
                v-for="point in game?.pointsToWin"
                :key="point"
                :icon="heart"
                :class="player.score >= point ? 'text-red-500' : 'text-slate-300'"
              ></FaIcon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="mb-6 text-slate-400 hover:text-slate-200 transition-colors text-center font-['Antonio'] text-lg"
    >
      <button class="tracking-wide" v-sound:click.negative @click="leaveGame">
        <FaIcon :icon="backArrow"></FaIcon>
        LEAVE GAME
      </button>
    </div>
  </aside>
</template>
