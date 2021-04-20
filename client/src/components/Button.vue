<template>
  <div class="pill" :class="{ active }">
    <b-image
      :src="player.photoURL || require('../assets/this_is_fine.jpeg')"
      :src-fallback="require('../assets/this_is_fine.jpeg')"
      ratio="1by1"
      rounded
      class="avatar"
      :class="{ active }"
    >
      <template #placeholder>
        <b-loading class="avatar" :is-full-page="false" :active="true" />
      </template>
    </b-image>
    <div class="pill-content mt-2 ml-2">
      <p class="is-size-6">{{ player.username }}</p>
      <p class="is-size-7">{{ player.score || 0 }}/{{ pointsToWin }}</p>
      <b-icon
        v-for="i in pointsToWin"
        :key="i"
        :type="i <= player.score ? 'is-danger' : 'is-white'"
        icon="heart"
        size="is-small" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { Player } from '@/types/Player';

@Component
export default class PlayerChip extends Vue {
  @Prop({ required: true }) player!: Player

  @Prop({ required: true }) pointsToWin!: number

  @Prop({ default: false, required: false }) active!: boolean
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables';

$pill-radius: 5rem;
$transition: border .15s ease-out;

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

.pill-content {
  @include impact-text;
}

.active {
  border: 3px solid $yellow;
  transition: $transition;
}
</style>
