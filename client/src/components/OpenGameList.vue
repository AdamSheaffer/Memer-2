<template>
  <div>
    <div v-for="game in games" :key="game.uid">
      <div class="columns">
        <p class="column">{{ game.hostPhotoURL }}</p>
        <p class="column">{{ game.uid }}</p>
        <p class="column">{{ timeAgo(game.beginDate) }}</p>
        <p class="column">{{ game.hostId }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { Game } from '@/types/Game';
import DateTimeMixin from '@/mixins/DateTimeMixin';

@Component
export default class OpenGameList extends Mixins(DateTimeMixin) {
  @Prop({ required: true }) readonly games!: Game[]
}
</script>

<style>

</style>
