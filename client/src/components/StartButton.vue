<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { useDeck } from "../composeables/useDeck";
import { useGame } from "../composeables/useGame";
import { useUser } from "../composeables/useUser";
import Button from "./base/Button.vue";

const props = defineProps<{ gameId: string }>();
const { activePlayers, players, startGame } = useGame(props.gameId);
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
  <div>
    <Button data-start-button :disabled="!hasMinimumPlayers || loading" @click="onStartButtonClick">
      START GAME
    </Button>
    <div v-if="!hasMinimumPlayers" data-waiting-on-players>Waiting on more players</div>
  </div>
</template>
