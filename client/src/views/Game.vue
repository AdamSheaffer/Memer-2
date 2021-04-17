<template>
  <div id="game-root">
    <gameroom-background>
      <player-chip />
    </gameroom-background>
  </div>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import UserMixin from '@/mixins/UserMixin';
import GameroomBackground from '@/components/GameroomBackground.vue';
import PlayerChip from '@/components/PlayerChip.vue';

@Component({
  components: { GameroomBackground, PlayerChip },
})
export default class Game extends Mixins(UserMixin) {
  mounted(): void {
    console.log(this.$route.params.gameId);
  }
}
</script>

<style lang="scss" scoped>

#game-root {
  width: 100%;
  height: 100%;
}

</style>
