<script setup lang="ts">
import { reactive, ref } from "vue";
import { GameSettings, SetupOption } from "../../../../types";
import { useAvatar } from "../../composables/useAvatar";
import { xMark } from "../../services/icons";
import { negativeSound } from "../../services/sounds";
import BackgroundBox from "../base/BackgroundBox.vue";
import ProfileCreate from "../ProfileCreate.vue";
import SetupWizardStep from "./SetupWizardStep.vue";

const emit = defineEmits<{
  (event: "submit", settings: GameSettings): void;
  (event: "cancelled"): void;
}>();

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
  { text: "NEVER", value: 0 },
  { text: "SOMETIMES", value: 0.25 },
  { text: "HALF N' HALF", value: 0.5 },
];
const timerOptions: SetupOption<number>[] = [
  { text: "NO LIMITS", value: 0 },
  { text: "30 SEC", value: 30 },
  { text: "60 SEC", value: 60 },
];
const nsfwOptions: SetupOption<boolean>[] = [
  { text: "YUH BOI NSFW", value: false },
  { text: "KEEP IT PG", value: true },
];

const gameSettings = reactive<GameSettings>({
  maxPlayers: 5,
  pointsToWin: 5,
  reverseRoundFrequency: 0.25,
  timeLimit: 0,
  safeForWork: false,
});

const completeAvatarStep = () => {
  stepNumber.value++;
  const { markAvatarAsSet } = useAvatar();
  markAvatarAsSet();
};

const cancel = () => {
  negativeSound.play();
  emit("cancelled");
};
</script>

<template>
  <BackgroundBox class="h-full relative">
    <div class="relative">
      <FaIcon
        :icon="xMark"
        class="cursor-pointer absolute right-4 top-4 text-slate-300 text-xl"
        title="CANCEL"
        @click="cancel"
      ></FaIcon>
    </div>
    <ProfileCreate v-if="stepNumber === 1" save-btn-text="NEXT" @submit="completeAvatarStep" />
    <SetupWizardStep
      v-if="stepNumber === 2"
      v-model.number="gameSettings.maxPlayers"
      :options="maxPlayersOptions"
      header="PLAYERS"
      subheader="HOW MANY PLAYERS, PLAYER?"
      @next="() => stepNumber++"
      @back="() => stepNumber--"
    />
    <SetupWizardStep
      v-if="stepNumber === 3"
      v-model.number="gameSettings.pointsToWin"
      :options="pointsToWinOptions"
      header="SCORES"
      subheader="HOW MANY POINTS TO WIN?"
      @next="() => stepNumber++"
      @back="() => stepNumber--"
    />
    <SetupWizardStep
      v-if="stepNumber === 4"
      v-model.number="gameSettings.reverseRoundFrequency"
      :options="reverseRoundOptions"
      header="REVERSE ROUNDS"
      subheader="HOW OFTEN DO YOU WANT REVERSE ROUNDS?"
      small-text
      small-col
      @next="() => stepNumber++"
      @back="() => stepNumber--"
    />
    <SetupWizardStep
      v-if="stepNumber === 5"
      v-model.number="gameSettings.timeLimit"
      :options="timerOptions"
      header="TIMER"
      subheader="HOW LONG SHOULD ONE ROUND LAST?"
      small-text
      @next="() => stepNumber++"
      @back="() => stepNumber--"
    />
    <SetupWizardStep
      v-if="stepNumber === 6"
      v-model.number="gameSettings.safeForWork"
      :options="nsfwOptions"
      header="NSFW?"
      subheader="YOU DOWN TO PARTY?"
      small-text
      last-step
      @next="() => emit('submit', gameSettings)"
      @back="() => stepNumber--"
    />
  </BackgroundBox>
</template>
