<template>
  <div class="divider">
    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Divider extends Vue {
  @Prop({ required: false }) text?: string
}

</script>

<style lang="scss" scoped>
@import '../styles/_variables';

.divider {
  display: flex;
  align-items: center;
  margin: 1em -1em;
  color: $white;
  opacity: 80%;

  &:before,
  &:after {
    content: "";
    flex: 1;
    height: 1px;
    margin: 0 1em;
    background: $white;
    opacity: 80%;
  }
}
</style>
