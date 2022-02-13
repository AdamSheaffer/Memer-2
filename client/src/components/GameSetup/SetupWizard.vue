<script setup lang="ts">
import { reactive, ref } from "vue";
import { Game, SetupOption } from "../../../../types";
import SetupWizardStep from "./SetupWizardStep.vue";

defineEmits<(event: "submit", settings: Partial<Game>) => void>();

const maxPlayersOptions: SetupOption<number>[] = [
  { text: "3", value: 3 },
  { text: "4", value: 4 },
  { text: "5", value: 5 },
  { text: "6", value: 6 },
  { text: "7", value: 7 },
];
const pointsToWinOptions: SetupOption<number>[] = [
  { text: "1", value: 1 },
  { text: "2", value: 2 },
  { text: "3", value: 3 },
  { text: "4", value: 4 },
  { text: "5", value: 5 },
  { text: "6", value: 6 },
  { text: "7", value: 7 },
];
const reverseRoundOptions: SetupOption<number>[] = [
  { text: "SOMETIMES", value: 0.25 },
  { text: "HALF N' HALF", value: 0.5 },
  { text: "NEVER", value: 0 },
];
const timerOptions: SetupOption<number>[] = [
  { text: "NO LIMITS", value: 0 },
  { text: "30 SEC", value: 30 },
  { text: "60 SEC", value: 60 },
];
const safeForWorkOptions: SetupOption<boolean>[] = [
  { text: "YEA BOI NSFW", value: false },
  { text: "I LIVE WITH MY MOM", value: true },
];

const gameSettings = reactive<Partial<Game>>({
  maxPlayers: 5,
  pointsToWin: 5,
  reverseRoundFrequency: 0.25,
  timeLimit: 0,
  safeForWork: false,
});
</script>

<template>
  <div>
    <SetupWizardStep
      header="PLAYERS"
      subheader="HOW MANY PLAYERS, PLAYER?"
      :options="maxPlayersOptions"
      v-model.number="gameSettings.maxPlayers"
    />
  </div>
</template>

<style></style>
