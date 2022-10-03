<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import GameArea from "../components/GameArea.vue";
import PlayersSidebar from "../components/PlayersSidebar.vue";
import ProfileCreate from "../components/ProfileCreate.vue";
import { useGame } from "../composeables/useGame";
import { useUser } from "../composeables/useUser";
import { joinGame } from "../services/gameService";

const gameId = useRoute().params.id as string;
const { user, userNeedsProfile } = useUser();
const { game, initialize } = useGame(gameId);

onMounted(() => joinGame(gameId, user.value!).then(initialize));
</script>

<template>
  <div>
    <div v-if="game?.uid">
      <ProfileCreate v-if="userNeedsProfile" :game-id="game?.uid" />
      <div class="flex">
        <div class="flex-initial w-72">
          <PlayersSidebar :game-id="game.uid" />
        </div>
        <div class="flex-1">
          <GameArea :game-id="game.uid" />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
