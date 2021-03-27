<template>
  <div class="card">
    <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>
    <h1>{{top}}</h1>
    <div>
      <img :src="imageURL" alt="">
    </div>
    <h1>{{bottom}}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Meme extends Vue {
  @Prop() private imageURL!: string

  @Prop() private top!: string

  @Prop() private bottom!: string

  isLoading = true

  isFullPage = true
}
</script>

<style>

</style>
