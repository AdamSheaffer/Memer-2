<template>
  <b-field grouped group-multiline>
    <div class="control">
      <b-tooltip :label="`${game.pointsToWin} points to win`" :delay="300">
        <b-taglist attached>
          <b-tag type="is-primary">
            <b-icon
              icon="heart"
              size="is-small" />
          </b-tag>
          <b-tag type="is-primary is-light">{{ game.pointsToWin }}</b-tag>
        </b-taglist>
      </b-tooltip>
    </div>
    <div class="control">
      <b-tooltip :label="`${game.maxPlayers} max players`" :delay="300">
        <b-taglist attached>
          <b-tag type="is-primary">
            <b-icon
              icon="user-friends"
              size="is-small" />
          </b-tag>
          <b-tag type="is-primary is-light">{{ game.pointsToWin }}</b-tag>
        </b-taglist>
      </b-tooltip>
    </div>
    <div class="control" v-if="!game.safeForWork">
      <b-tooltip label="Not safe for work" :delay="300">
        <b-taglist attached>
          <b-tag type="is-danger">
            <b-icon
              icon="user-friends"
              size="is-small" />
          </b-tag>
          <b-tag type="is-danger is-light">NSFW</b-tag>
        </b-taglist>
      </b-tooltip>
    </div>
  </b-field>
</template>

<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator';
import { Game } from '@/types/Game';
import Avatar from '@/components/Avatar.vue';

@Component({
  components: { Avatar },
})
export default class OpenGameTags extends Vue {
  @Prop({ required: true }) readonly game!: Game
}
</script>
