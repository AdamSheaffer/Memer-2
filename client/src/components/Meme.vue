<template>
  <div class="meme">
    <div class="text">
      <span :class="headerClass">{{ top }}</span>
    </div>
    <img :src="imageURL" class="image meme-image" />
    <div class="text">
      <span :class="headerClass">{{ bottom }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Mixins, Prop, Watch,
} from 'vue-property-decorator';
import MemeTextMixin, { TextScaling } from '@/mixins/MemeTextMixin';

@Component
export default class Meme extends Mixins(MemeTextMixin) {
  @Prop() private imageURL!: string;

  @Prop() private top!: string;

  @Prop() private bottom!: string;

  get headerClass(): string {
    return `is-size-${this.headerSize}`;
  }

  @Watch('bottom')
  async onTextChange(): Promise<void> {
    return this.setHeaderSize({ top: this.top, bottom: this.bottom }, TextScaling.Small);
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables';

.meme {
  @include impact-text;
  text-shadow: none;
  border: 2px solid $primary;
  background: $purple-2;
  font-size: .8rem;
  display: grid;
  align-content: space-between;
}

.meme-image {
  padding: 0 1rem;
  height: 200px;
}

.text {
  height: 50px;
  text-align: center;
  line-height: 50px;
  span {
    display: inline-block;
    text-align: center;
    line-height: normal;
  }
}

</style>
