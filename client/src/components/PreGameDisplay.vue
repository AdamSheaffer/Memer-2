<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { useDeck } from "../composables/useDeck";
import { useGame } from "../composables/useGame";
import { useUser } from "../composables/useUser";
import MemerButton from "./base/MemerButton.vue";

const props = defineProps<{ gameId: string }>();
const { game, activePlayers, players, startGame, userIsHost, host } = useGame(props.gameId);
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
  await Promise.all([
    startGame(user.value.uid),
    dealToPlayers(props.gameId, playerIds, game.value?.safeForWork),
  ]);
  loading.value = false;
};
</script>

<template>
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    <MemerButton
      v-if="userIsHost"
      color="teal"
      round
      class="py-4 md:py-6 tracking-widest text-xl w-64 shadow-2xl"
      data-start-button
      :disabled="!hasMinimumPlayers || loading"
      @click="onStartButtonClick"
    >
      START GAME
    </MemerButton>
    <div
      v-if="!hasMinimumPlayers"
      class="text-slate-100 font-['Antonio'] text-2xl md:text-4xl mt-4 text-shadow"
      data-waiting-on-players
    >
      WAITING ON MORE PLAYERS...
    </div>

    <div
      v-if="hasMinimumPlayers && !userIsHost"
      class="text-slate-100 font-['Antonio'] text-2xl md:text-4xl mt-4 text-shadow-lg"
      data-waiting-on-host
    >
      WAITING ON <span class="text-teal-400">{{ host?.username }}</span> TO START THE GAME...
    </div>
  </div>
</template>
