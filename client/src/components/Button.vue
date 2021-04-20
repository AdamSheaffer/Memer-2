<template>
  <div class="test">
    hello
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
//import { Player } from "@/types/Player";

@Component
export default class Button extends Vue {
  //@Prop({ required: true }) player!: Player;

  @Prop({ default: true, required: false }) rounded!: boolean;
}
</script>

<style lang="scss" scoped>
@import "../styles/_variables";

$pill-radius: 5rem;
$transition: border 0.15s ease-out;

.pill {
  width: 15rem;
  background: $primary;
  display: grid;
  grid-template-columns: 25% 1fr;
  border-radius: $pill-radius;
  transition: $transition;
  display: grid;
  grid-template-columns: $pill-radius 1fr;
}

.avatar {
  width: $pill-radius;
  height: $pill-radius;
  border-radius: $pill-radius;
  transition: $transition;
  &.active {
    border-left: 0;
  }
}

.test {
  height: 500px;
  width: 100px;
}

.pill-content {
  @include impact-text;
}

.active {
  border: 3px solid $yellow;
  transition: $transition;
}
</style>
