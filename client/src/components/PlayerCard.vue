<template>
  <div
    @click="select(card)"
    class="player-card"
    :class="{ clickable: clickable, active: active }">
    <section class="text top">
      <p>{{ card.top && card.top.toUpperCase() }}</p>
    </section>
    <div class="has-text-centered">
      <slot></slot>
    </div>
    <section class="text bottom">
      <p>{{ card.bottom && card.bottom.toUpperCase() }}</p>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { Card } from '@/types/Card';

@Component
export default class PlayerHand extends Vue {
  @Prop({ required: true }) card!: Card

  @Prop({ required: false, default: false }) clickable!: boolean

  @Prop({ required: false, default: false }) active!: boolean

  select(card: Card): void {
    if (this.clickable) {
      this.$emit('select', card);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables';

.player-card {
  @include impact-text;
  text-shadow: none;
  border: 2px solid $primary;
  background: $purple-2;
  font-size: .8rem;
  display: grid;
  align-content: space-between;
  height: 175px;
  width: 150px;
}
.text {
  text-align: center;
  padding: 1rem;
}

.clickable {
  cursor: pointer;
  &:hover {
    border-color: $success;
  }
}

.active {
  border-color: $success;
}

.slot {
  margin-left: 50px;
}
</style>
