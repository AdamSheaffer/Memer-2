<script setup lang="ts">
import { useRouter } from "vue-router";
import { GameSettings } from "../../../types";
import SetupWizard from "../components/GameSetup/SetupWizard.vue";
import { useGameStore } from "../store/game";

const { createGame } = useGameStore();
const router = useRouter();

const onSetupCompletion = async (gameSettings: GameSettings) => {
  const gameId = await createGame(gameSettings);
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
