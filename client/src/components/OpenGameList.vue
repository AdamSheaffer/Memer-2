<template>
  <div>
    <div v-if="!games.length">
      <div class="box tile tile--empty my-3">
        <b-icon
          class="is-hidden-mobile"
          type="is-primary"
          size="is-large"
          icon="dizzy" />
        <h3 class="ml-3">
          Hmmm, there aren't any open games right now...
          <br>
          <span class="has-text-primary">Try hosting a new game</span>
        </h3>
      </div>
    </div>
    <div v-for="game in games" :key="game.uid" class="box tile my-3">
      <div class="game-listing">
        <div class="thumbnail">
          <avatar :imageURL="game.hostPhotoURL" size="60px"/>
        </div>
        <div>
          <p class="is-size-7">
            <span>Created</span>
            <span>
              {{ timeAgo(game.beginDate) }}
            </span>
          </p>
          <open-game-tags :game="game" class="is-hidden-mobile" />
        </div>
        <div>
          <b-button type="is-primary" outline expanded @click="join(game)">JOIN</b-button>
        </div>
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
import Avatar from '@/components/Avatar.vue';
import OpenGameTags from '@/components/OpenGameTags.vue';

@Component({
  components: { Avatar, OpenGameTags },
})
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

<style scoped lang="scss">
@import '../styles/_variables';

.tile {
  padding: 10px;
  background: $purple-2;
  color: $white;
  border: 2px solid $primary;
}
.game-listing {
  display: grid;
  grid-template-columns: 80px 1fr 100px;
  gap: 10px;
  width: 100%;
  align-items: center;
}
</style>
