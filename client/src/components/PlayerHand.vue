<template>
  <div class="player-hand">
    <div v-for="card in cards" :key="card.id" class="player-card">
      <section class="text top">
        <p>{{ card.top && card.top.toUpperCase() }}</p>
      </section>
      <section class="text bottom">
        <p>{{ card.bottom && card.bottom.toUpperCase() }}</p>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { Card } from '@/types/Card';

@Component
export default class PlayerChip extends Vue {
  @Prop({ required: true }) cards!: Card[]
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables';

.player-hand {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: .5rem;
}
.player-card {
  @include impact-text;
  text-shadow: none;
  border: 2px solid $primary;
  background: $purple-2;
  font-size: .8rem;
  display: grid;
  align-content: space-between;
  height: 175px;
}
.text {
  text-align: center;
  padding: 1rem;
}
</style>
