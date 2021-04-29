<template>
  <div class="meme">
    <div class="text">
      <span class="is-size-5">{{ top }}</span>
    </div>
    <img :src="imageURL" class="image meme-image" />
    <div class="text">
      <span class="is-size-5">{{ bottom }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Meme extends Vue {
  @Prop() private imageURL!: string

  @Prop() private top!: string

  @Prop() private bottom!: string
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
  height: 3rem;
  text-align: center;
  line-height: 3rem;
  span {
    display: inline-block;
    text-align: center;
    line-height: normal;
  }
}

</style>
