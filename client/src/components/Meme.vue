<template>
  <div class="meme">
    <h1 class="text">{{ top }}</h1>
    <img :src="imageURL" class="image meme-image" />
    <h1 class="text">{{ bottom }}</h1>
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
  padding: 1rem;
  height: 200px;
}

.text {
  text-align: center;
  height: 3rem;
}
</style>
