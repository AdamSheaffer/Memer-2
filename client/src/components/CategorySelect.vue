<template>
  <div class="category-select">

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Divider extends Vue {
  @Prop({ required: true }) options!: string[]

  @Prop({ required: true }) isPicking!: boolean
}

</script>

<style lang="scss" scoped>
@import '../styles/_variables';

</style>
