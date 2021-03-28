<template>
  <div>
    <div v-for="game in games" :key="game.uid">
      <div class="columns">
        <p class="column">
          {{ game.hostPhotoURL }}
          <b-button @click="join(game)">JOIN</b-button>
        </p>
        <p class="column">{{ game.uid }}</p>
        <p class="column">{{ timeAgo(game.beginDate) }}</p>
        <p class="column">{{ game.hostId }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Mixins, Prop, Emit,
} from 'vue-property-decorator';
import { Game } from '@/types/Game';
import DateTimeMixin from '@/mixins/DateTimeMixin';

@Component
export default class OpenGameList extends Mixins(DateTimeMixin) {
  @Prop({ required: true }) readonly games!: Game[]

  @Emit()
  join(game: Game): string {
    if (!game.uid) {
      throw Error('Attempted to join game without uid');
    }
    return game.uid;
  }
}
</script>

<style>

</style>
