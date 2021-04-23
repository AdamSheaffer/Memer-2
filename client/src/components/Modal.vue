<template>
  <b-modal :width="450" active :custom-class="blur ? 'blur': ''">
    <div class="setup-wizard setup-wizard-outer">
      <div class="setup-wizard-inner">
        <slot />
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
  @Prop({ required: false, default: false }) blur!: boolean
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables';

.blur {
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
