<template>
  <b-modal active :width="450" custom-class="setup-modal">
    <div class="setup-wizard setup-wizard-outer">
      <div class="setup-wizard-inner">
        <setup-wizard-step
          v-if="currentStep === 1"
          v-model="maxPlayers"
          :options="maxPlayersOptions"
          header="PLAYERS"
          subheader="HOW MANY PLAYERS, PLAYER?"
        />
        <setup-wizard-step
          v-if="currentStep === 2"
          v-model="pointsToWin"
          :options="pointsToWinOptions"
          header="SCORES"
          subheader="HOW MANY POINTS TO WIN?"
        />
        <div class="mt-6 mb-3 is-flex is-justify-content-flex-end">
          <b-button
            v-if="currentStep !== 1"
            @click="currentStep -= 1"
            class="mr-3"
          >
            BACK
          </b-button>
          <b-button
            @click="currentStep += 1"
            type="is-info"
          >
            NEXT
          </b-button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SetupOption } from '@/types/SetupOption';
import SetupWizardStep from './SetupWizardStep.vue';

@Component({
  components: { SetupWizardStep },
})
export default class SetupWizard extends Vue {
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

  maxPlayers = 5;

  pointsToWin = 5;

  currentStep = 1;

  cancel(): void {
    this.$emit('on-cancel');
  }

  next(): void {
    this.$emit('on-complete', {});
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
</style>
