<template>
  <modal :blur="true">
    <div class="close-btn is-pulled-right" @click="cancel" title="Cancel">
      <b-icon
        size="is-small"
        type="is-info"
        icon="times" />
    </div>
    <b-tabs v-model="currentStep">
      <b-tab-item>
        <setup-wizard-step
          v-model="maxPlayers"
          :options="maxPlayersOptions"
          header="PLAYERS"
          subheader="HOW MANY PLAYERS, PLAYER?"
        />
      </b-tab-item>
      <b-tab-item>
        <setup-wizard-step
          v-model="pointsToWin"
          :options="pointsToWinOptions"
          header="SCORES"
          subheader="HOW MANY POINTS TO WIN?"
        />
      </b-tab-item>
      <b-tab-item>
        <setup-wizard-step
          v-model="reverseRoundFrequency"
          :options="reverseRoundOptions"
          header="REVERSE"
          subheader="HOW OFTEN DO YOU WANT REVERSE ROUNDS?"
          :small="true"
        />
      </b-tab-item>
      <b-tab-item>
        <setup-wizard-step
          v-model="timeLimit"
          :options="timerOptions"
          header="TIMER"
          subheader="HOW LONG SHOULD ONE ROUND LAST?"
          :small="true"
        />
      </b-tab-item>
      <b-tab-item>
        <setup-wizard-step
          v-model="safeForWork"
          :options="safeForWorkOptions"
          header="NSFW"
          subheader="YOU DOWN TO PARTY?"
          :small="true"
        />
      </b-tab-item>
    </b-tabs>

    <div class="mt-6 mb-3 is-flex is-justify-content-flex-end">
      <b-button
        v-if="!isFirstStep"
        @click="currentStep -= 1"
        class="mr-3 btn"
        type="is-info"
        outlined
      >
        BACK
      </b-button>
      <b-button
        v-if="!isLastStep"
        @click="currentStep += 1"
        type="is-info"
        class="btn"
      >
        NEXT
      </b-button>
      <b-button
        v-else
        @click="complete"
        type="is-success"
        class="btn"
      >
        START
      </b-button>
    </div>
  </modal>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import { SetupOption } from '@/types/SetupOption';
import { Game } from '@/types/Game';
import SetupWizardStep from './SetupWizardStep.vue';
import Modal from './Modal.vue';

@Component({
  components: { SetupWizardStep, Modal },
})
export default class SetupWizard extends Vue {
  currentStep = 0;

  maxPlayersOptions: SetupOption[] = [
    { text: '3', value: 3 },
    { text: '4', value: 4 },
    { text: '5', value: 5 },
    { text: '6', value: 6 },
    { text: '7', value: 7 },
  ]

  pointsToWinOptions: SetupOption[] = [
    { text: '1', value: 1 },
    { text: '2', value: 2 },
    { text: '3', value: 3 },
    { text: '4', value: 4 },
    { text: '5', value: 5 },
    { text: '6', value: 6 },
    { text: '7', value: 7 },
  ]

  reverseRoundOptions: SetupOption[] = [
    { text: 'SOMETIMES', value: 0.25 },
    { text: 'HALF N\' HALF', value: 0.5 },
    { text: 'NEVER', value: 0 },
  ]

  timerOptions: SetupOption[] = [
    { text: 'NO LIMITS', value: 0 },
    { text: '30 SEC', value: 30 },
    { text: '60 SEC', value: 60 },
  ]

  safeForWorkOptions: SetupOption[] = [
    { text: 'YEA BOI NSFW', value: false },
    { text: 'I LIVE WITH MY MOM', value: true },
  ]

  maxPlayers = 5;

  pointsToWin = 5;

  reverseRoundFrequency = 0.25;

  timeLimit = 0;

  safeForWork = false;

  cancel(): void {
    this.$emit('on-cancel');
  }

  @Emit('on-complete')
  complete(): Game {
    return {
      maxPlayers: this.maxPlayers,
      pointsToWin: this.pointsToWin,
      reverseRoundFrequency: this.reverseRoundFrequency,
      safeForWork: this.safeForWork,
      timeLimit: this.timeLimit,
    };
  }

  get isFirstStep(): boolean {
    return this.currentStep === 0;
  }

  get isLastStep(): boolean {
    return this.currentStep === 4;
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables';

.setup-modal {
  @include background-blur;
}

.setup-wizard {
  background: $white;
  border-radius: $tile-border-radius;
}

.setup-wizard-outer {
  padding: 1rem;
}

.setup-wizard-inner {
  border: 1px solid $primary;
  border-radius: $tile-border-radius;
  padding: 2rem 1rem;
}

.btn{
  min-width: 90px;
}

.close-btn {
  cursor: pointer;
}

::v-deep nav.tabs {
  display: none;
}
</style>
