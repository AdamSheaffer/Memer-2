<script setup lang="ts">
import { useGame } from "../composables/useGame";
import { check, gavel, heart } from "../services/icons";

const props = defineProps<{ gameId: string }>();

const { activePlayers, game, currentPlayer } = useGame(props.gameId);
</script>

<template>
  <aside class="w-72 flex flex-col space-y-4 bg-darkblue-500 h-full px-4 py-2">
    <h1 class="text-purple-400 text-6xl text-shadow-lg mb-4 mt-2">MEMER</h1>
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
  </aside>
</template>
