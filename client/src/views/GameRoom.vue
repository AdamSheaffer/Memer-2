<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import GameArea from "../components/GameArea.vue";
import PlayersSidebar from "../components/PlayersSidebar.vue";
import { useGame } from "../composeables/useGame";
import { useUser } from "../composeables/useUser";
import { joinGame } from "../services/gameService";

const gameId = useRoute().params.id as string;
const { user } = useUser();
const { game, initialize } = useGame(gameId);

onMounted(() => joinGame(gameId, user.value!).then(initialize));
</script>

<template>
  <div>
    GAMEROOM
    <div v-if="game?.uid">
      <PlayersSidebar :game-id="game.uid" />
      <GameArea :game-id="game.uid" />
    </div>
  </div>
</template>

<style></style>
