<script setup lang="ts">
import { useRouter } from "vue-router";
import { GameSettings } from "../../../types";
import SetupWizard from "../components/GameSetup/SetupWizard.vue";
import { createGame } from "../services/gameService";
import { useUserStore } from "../store/user";

const { user } = useUserStore();
const router = useRouter();

const onSetupCompletion = async (gameSettings: GameSettings) => {
  const gameId = await createGame(gameSettings, user!.uid);
  router.push(`/game/${gameId}`);
};
</script>

<template>
  <div>
    <h1>Create Game</h1>
    <SetupWizard @submit="onSetupCompletion" />
  </div>
</template>

<style></style>
