<template>
  <b-modal :width="450" active :custom-class="blur ? 'blur': ''">
    <div class="modal-window modal-window-outer" :class="{ dark: dark }">
      <div class="modal-window-inner">
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

  @Prop({ required: false, default: false }) dark!: boolean
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables';

.blur {
  @include background-blur(3px);
}

.modal-window {
  background: $white;
  border-radius: $tile-border-radius;

  &.dark {
    background: $purple-2;
  }
}

.modal-window-outer {
  padding: 1rem;
}

.modal-window-inner {
  border: 1px solid $primary;
  border-radius: $tile-border-radius;
  padding: 2rem 1rem;
}
</style>
