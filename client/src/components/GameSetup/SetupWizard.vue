<script setup lang="ts">
import { reactive, ref } from "vue";
import { GameSettings, SetupOption } from "../../../../types";
import SetupWizardStep from "./SetupWizardStep.vue";

const emit = defineEmits<(event: "submit", settings: GameSettings) => void>();

const stepNumber = ref(1);

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

const gameSettings = reactive<GameSettings>({
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
      v-if="stepNumber === 1"
      v-model.number="gameSettings.maxPlayers"
      :options="maxPlayersOptions"
      first-step
      header="PLAYERS"
      subheader="HOW MANY PLAYERS, PLAYER?"
      @next="() => stepNumber++"
    />
    <SetupWizardStep
      v-if="stepNumber === 2"
      v-model.number="gameSettings.pointsToWin"
      :options="pointsToWinOptions"
      header="SCORES"
      subheader="HOW MANY POINTS TO WIN?"
      @next="() => stepNumber++"
      @back="() => stepNumber--"
    />
    <SetupWizardStep
      v-if="stepNumber === 3"
      v-model.number="gameSettings.reverseRoundFrequency"
      :options="reverseRoundOptions"
      header="REVERSE ROUNDS"
      subheader="HOW OFTEN DO YOU WANT REVERSE ROUNDS?"
      @next="() => stepNumber++"
      @back="() => stepNumber--"
    />
    <SetupWizardStep
      v-if="stepNumber === 4"
      v-model.number="gameSettings.timeLimit"
      :options="timerOptions"
      header="TIMER"
      subheader="HOW LONG SHOULD ONE ROUND LAST?"
      last-step
      @next="() => emit('submit', gameSettings)"
      @back="() => stepNumber--"
    />
  </div>
</template>

<style></style>
