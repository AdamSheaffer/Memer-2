<template>
  <div id="game-root">
    <gameroom-background>
      <player-chip
        v-for="player in players"
        :key="player.uid"
        :player="player"
        :active="false"
        :pointsToWin="game.pointsToWin"/>
    </gameroom-background>
  </div>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { db } from '@/firebase';
import UserMixin from '@/mixins/UserMixin';
import GameMixin from '@/mixins/GameMixin';
import PlayerMixin from '@/mixins/PlayerMixin';
import GameroomBackground from '@/components/GameroomBackground.vue';
import PlayerChip from '@/components/PlayerChip.vue';

const gameStore = namespace('game');

@Component({
  components: { GameroomBackground, PlayerChip },
})
export default class Game extends Mixins(UserMixin, GameMixin, PlayerMixin) {
  mounted(): void {
    const { gameId } = this.$route.params;
    this.trackGame(gameId);
    this.trackPlayers(gameId);
  }
}
</script>

<style lang="scss" scoped>

#game-root {
  width: 100%;
  height: 100%;
}

</style>
