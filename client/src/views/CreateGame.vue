<script setup lang="ts">
import { useRouter } from "vue-router";
import { GameSettings } from "../../../types";
import SetupWizard from "../components/GameSetup/SetupWizard.vue";
import { useUser } from "../composeables/useUser";
import { createGame } from "../services/gameService";

const router = useRouter();
const { user } = useUser();

const onSetupCompletion = async (gameSettings: GameSettings) => {
  const gameId = await createGame(gameSettings, user.value!.uid, user.value!.photoURL!);
  router.push(`/game/${gameId}`);
};

const onCancel = () => router.push("/");
</script>

<template>
  <SetupWizard @submit="onSetupCompletion" @cancelled="onCancel" />
</template>

<style></style>
