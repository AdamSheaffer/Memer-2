<template>
  <div class="card">
    <h1>{{ top }}</h1>
    <div>
      <img :src="imageURL" alt="">
    </div>
    <h1>{{ bottom }}</h1>
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

<style>

</style>
