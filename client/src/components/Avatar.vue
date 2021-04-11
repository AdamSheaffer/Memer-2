<template>
  <div class="image-container" :style="styles">
    <b-image
      class="img"
      :src="image"
      :src-fallback="fallbackURL"
      ratio="1by1"
      rounded>
    </b-image>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Avatar extends Vue {
  @Prop({ required: true }) private imageURL!: string

  @Prop({ required: false, default: '7rem' }) private size!: string

  private readonly fallbackURL = '/images/fallback_image.jpeg'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get styles(): any {
    return {
      height: this.size,
      width: this.size,
      'border-radius': this.size,
    };
  }

  get image(): string {
    return this.imageURL || this.fallbackURL;
  }
}
</script>

<style scoped lang="scss">
@import '../styles/_variables';

.image-container {
  border: 3px solid $yellow;
}
</style>
