<script setup lang="ts">
import { useRouter } from "vue-router";
import { GameSettings } from "../../../types";
import SetupWizard from "../components/GameSetup/SetupWizard.vue";
import { useUser } from "../composeables/useUser";
import { createGame } from "../services/gameService";

const router = useRouter();
const { user } = useUser();

const onSetupCompletion = async (gameSettings: GameSettings) => {
  const gameId = await createGame(gameSettings, user.value!.uid);
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
