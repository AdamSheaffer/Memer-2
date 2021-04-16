<template>
  <div class="meme">
    <div class="meme--text meme--text__top">
      <h1 ref="topEl">{{ top && top.toUpperCase() }}</h1>
    </div>
    <div ref="imageEl">
      <b-image class="meme--image" :src="imageURL" />
    </div>
    <div class="meme--text meme--text__bottom">
      <h1 ref="bottomEl">{{ bottom.toUpperCase() }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class Meme extends Vue {
  @Prop() top?: string

  @Prop() bottom!: string

  @Prop() imageURL!: string
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables.scss';

.meme {
  border: 2px solid $primary;
  background: $purple-2;
  padding: 1rem;
  @include impact-text;
}

.meme--text {
  line-height: 25px;
  text-align: center;

  &__top {
    margin-bottom: 1rem;
  }

  &__bottom {
    margin-top: 1rem;
  }
}

</style>
