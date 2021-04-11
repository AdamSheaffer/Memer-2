<template>
  <div class="image-container">
    <b-image
      class="img"
      :src="imageURL"
      ratio="1by1"
      rounded>
    </b-image>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Meme extends Vue {
  @Prop({ required: true }) private imageURL!: string
}
</script>

<style scoped lang="scss">
@import '../styles/_variables';

.image-container {
  height: 7rem;
  width: 7rem;
  border: 3px solid $yellow;
  border-radius: 8rem;
}
</style>
