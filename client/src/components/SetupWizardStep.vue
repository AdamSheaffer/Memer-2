<template>
  <div class="setup-wizard-step">
    <div class="setup-wizard-inner">
      <h2 class="step-header is-size-2">{{ header }}</h2>
      <span class="step-subheader is-size-7">{{ subheader }}</span>
      <div class="options">
        <div class="option is-size-3" v-for="(option, index) in options" :key="index">
          <span
            @click="selectOption(option)"
            :class="{'option--active': option.value === value }"
          >
            {{ option.text }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { SetupOption } from '@/types/SetupOption';

@Component
export default class SetupWizard extends Vue {
  @Prop({ required: true }) value!: unknown

  @Prop({ required: true }) header!: string

  @Prop({ required: true }) subheader!: string

  @Prop({ required: true }) options!: SetupOption[]

  selectOption({ value }: SetupOption): void {
    this.$emit('input', value);
  }

  back(): void {
    this.$emit('back');
  }

  next(): void {
    this.$emit('next');
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables';

.step-header {
  @include impact-text;
  color: $purple-1;
  line-height: 2.5rem;
}

.step-subheader {
  color: $purple-2;
}

.options {
  margin: 40px 20px 20px;
  display: flex;
  justify-content: space-between;

  span {
    @include impact-text;
    cursor: pointer;
    height: 4.5rem;
    line-height: 4.5rem;
    -webkit-transition: all .1s ease-out;
    -moz-transition: all .1s ease-out;
    -o-transition: all .1s ease-out;
    transition: all .1s ease-out;
    color: $primary;
  }

  .option--active {
    font-size: 3rem;
    color: $yellow;
  }
}

</style>
