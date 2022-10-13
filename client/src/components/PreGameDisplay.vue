<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { useDeck } from "../composables/useDeck";
import { useGame } from "../composables/useGame";
import { useUser } from "../composables/useUser";
import Button from "./base/Button.vue";

const props = defineProps<{ gameId: string }>();
const { activePlayers, players, startGame, userIsHost, host } = useGame(props.gameId);
const { user } = useUser();
const { dealToPlayers } = useDeck();
const hasMinimumPlayers = computed(() => activePlayers.value.length >= 3);
const loading = ref(false);

const onStartButtonClick = async () => {
  if (!user.value) {
    throw Error("User is not logged in");
  }

  loading.value = true;
  const playerIds = players.value.map((p) => p.uid);
  await Promise.all([startGame(user.value.uid), dealToPlayers(props.gameId, playerIds)]);
  loading.value = false;
};
</script>

<template>
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    <button
      v-if="userIsHost"
      class="bg-teal-500 py-4 text-white text-shadow w-52 rounded-3xl shadow-2xl cursor-pointer hover:bg-teal-400 border-2 border-teal-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-500"
      data-start-button
      :disabled="!hasMinimumPlayers || loading"
      @click="onStartButtonClick"
    >
      START GAME
    </button>
    <div
      v-if="!hasMinimumPlayers"
      class="text-slate-100 font-['Antonio'] text-4xl mt-4 text-shadow"
      data-waiting-on-players
    >
      WAITING ON MORE PLAYERS...
    </div>

    <div
      v-if="hasMinimumPlayers && !userIsHost"
      class="text-slate-100 font-['Antonio'] text-4xl mt-4 text-shadow-lg"
      data-waiting-on-host
    >
      WAITING ON <span class="text-teal-400">{{ host?.username }}</span> TO START THE GAME...
    </div>
  </div>
</template>
