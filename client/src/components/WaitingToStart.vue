<template>
  <div class="waiting-to-start">
    <div v-if="!isHost">
      <div class="game-loader">
        <loader :size="120" />
      </div>
      <h5 class="is-size-3 has-text-success has-text-centered">
          WAITING ON
          <span class="has-text-warning">
            {{ host && host.username.toUpperCase() }}
          </span>
          TO START THE GAME...
        </h5>
    </div>
    <div v-else>
      <div class="button-wrapper">
        <b-button
          size="is-large"
          rounded
          type="is-success"
          :disabled="disableStartButton"
          @click="startGame">
          START
        </b-button>
      </div>
      <h5 class="is-size-3 has-text-warning has-text-centered mt-3">
        WAITING FOR OTHER PLAYERS...
      </h5>
    </div>
  </div>
</template>

<script lang="ts">
import { Player } from '@/types/Player';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Loader from '@/components/Loader.vue';

const gameStore = namespace('game');

@Component({
  components: {
    Loader,
  },
})
export default class WaitingToStart extends Vue {
  @gameStore.Getter
  public readonly isHost!: boolean

  @gameStore.Getter
  public readonly host!: Player | null;

  @gameStore.Getter
  public readonly playerCount!: number

  get disableStartButton(): boolean {
    return this.playerCount < 2;
  }

  startGame(): void {
    if (this.isHost) {
      this.$emit('start');
    }
  }
}

</script>

<style lang="scss" scoped>
.waiting-to-start {
  position: absolute;
  height: 100%;
  width: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
}

.game-loader, .button-wrapper {
  display: flex;
  justify-content: center;
}

</style>
