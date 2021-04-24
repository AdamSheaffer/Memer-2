<template>
  <div id="game-root">
    <gameroom-background />
    <div v-if="dataLoaded">
      <players :game="game" :players="players" :current-player-id="user.uid" />
    </div>
    <div v-if="dataLoaded" class="game-table">
      <div class="game">
        <div class="game-container">
          <b-button v-if="showStartButton" @click="startGame">START</b-button>
<<<<<<< HEAD
          <template-builder
            class="border-clear-top pt-5"
            v-if="isPickingCategory || (isPickingGif && isYourTurn)"
            @category-select="categorySelect"
            @gif-select="gifSelect"
            :category-options="game.tagOptions"
            :gif-options="game.gifOptionURLs"
            :is-picking="isYourTurn"
            :turn-username="playerTurn && playerTurn.username"/>
=======
          <category-select
            class="border-clear-top pt-5"
            v-if="isPickingTags"
            @select="categorySelect"
            :options="game.tagOptions"
            :isPicking="isYourTurn"
            :turnUsername="playerTurn && playerTurn.username"/>
>>>>>>> master
          <div class="hand">
            <player-hand v-show="showHand" :cards="hand" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';
import GameroomBackground from '@/components/GameroomBackground.vue';
import PlayerChip from '@/components/PlayerChip.vue';
import ActionHeader from '@/components/ActionHeader.vue';
import PlayerHand from '@/components/PlayerHand.vue';
import Players from '@/components/Players.vue';
<<<<<<< HEAD
import TemplateBuilder from '@/components/TemplateBuilder.vue';
=======
import CategorySelect from '@/components/CategorySelect.vue';
>>>>>>> master
import UserMixin from '@/mixins/UserMixin';
import GameMixin from '@/mixins/GameMixin';
import PlayerMixin from '@/mixins/PlayerMixin';
import HandMixin from '@/mixins/HandMixin';
import CategoryMixin from '@/mixins/CategoryMixin';
import { Game } from '@/types/Game';
import { Player } from '@/types/Player';
<<<<<<< HEAD
import { Meme } from '@/types/Meme';
=======
>>>>>>> master
import gameService from '@/services/game';
import gifService from '@/services/gif';
import firebase from '@/firebase';

@Component({
  components: {
    GameroomBackground,
    PlayerChip,
    ActionHeader,
    PlayerHand,
    Players,
<<<<<<< HEAD
    TemplateBuilder,
=======
    CategorySelect,
>>>>>>> master
  },
})
export default class GameRoom extends Mixins(
  UserMixin, GameMixin, PlayerMixin, HandMixin, CategoryMixin,
) {
  get gameId(): string {
    return this.$route.params.gameId;
  }

  get dataLoaded(): boolean {
    return (
      !!this.game
      && !!this.players
      && !!this.players.length
      && !!this.allCategories);
  }

  get isHost(): boolean {
    return this.game?.hostId === this.user?.uid;
  }

  get isYourTurn(): boolean {
    return this.game?.turn === this.user.uid;
  }

<<<<<<< HEAD
  get isPickingCategory(): boolean {
=======
  get isPickingTags(): boolean {
>>>>>>> master
    if (!this.dataLoaded) return false;

    return !!this.game?.tagOptions?.length && !this.game?.tagSelection;
  }

  get isPickingGif(): boolean {
    if (!this.dataLoaded) return false;

    return !!this.game?.tagSelection && !this.game.memeTemplate;
  }

  get playerTurn(): Player | undefined {
    return this.players?.find((p) => p.uid === this.game?.turn);
  }

  get showHand(): boolean {
<<<<<<< HEAD
    if (this.isPickingCategory) return false;
=======
    if (this.isPickingTags) return false;
>>>>>>> master
    if (this.isPickingGif && this.isHost) return false;

    return true;
  }

  get showStartButton(): boolean {
    return (
      this.isHost
      && !!this.game
      && !this.game.hasStarted
      && !!this.players
      && this.players.length > 1);
  }

  async mounted(): Promise<void> {
    this.trackGame(this.gameId);
    this.trackPlayers(this.gameId);
    this.trackPlayerHand(this.gameId, this.user.uid);
    await this.getCategories();
  }

  startGame(): void {
    gameService.startGame(this.gameId, this.user.uid);
  }

  dealCards(): void {
    if (!this.players) {
      throw Error('No players in game to deal to');
    }
    const playerIds = this.players.map((p) => p.uid);
    gameService.dealToAllPlayers(this.gameId, playerIds);
  }

<<<<<<< HEAD
  async categorySelect(category: string): Promise<void> {
    await gameService.update({ tagSelection: category }, this.gameId);

    if (this.isYourTurn) {
      const urls = await gifService.getRandomImages(category);
      await gameService.update({ gifOptionURLs: urls }, this.gameId);
    }
  }

  async gifSelect(url: string): Promise<void> {
    const memeTemplate: Meme = {
      photoURL: url,
      top: null,
      bottom: null,
    };
    await gameService.update({
      memeTemplate,
      memeTemplateTimestamp: firebase.firestore.Timestamp.now(),
    }, this.gameId);
=======
  categorySelect(category: string): void {
    gameService.update({ tagSelection: category }, this.gameId);
>>>>>>> master
  }

  @Watch('game')
  async gameChanged(newVal: Game, oldVal: Game | null): Promise<void> {
    if (!oldVal) return;

    const justStarted = newVal.hasStarted && !oldVal.hasStarted;

    if (justStarted && this.isHost) {
      this.dealCards();
    }
  }

  @Watch('isYourTurn')
  turnChange(isYourTurn: boolean, wasYourTurn: boolean | null): void {
<<<<<<< HEAD
=======
    console.log('it just became your turn');
>>>>>>> master
    if (!this.dataLoaded) return;

    if (isYourTurn && !wasYourTurn) {
      const tagOptions = this.randomTagOptions();

      gameService.update({ tagOptions }, this.gameId);
    }
  }
}
</script>

<style lang="scss" scoped>

#game-root, .game-container, .game-table {
  width: 100%;
  height: 100%;
}

.game-table {
  grid-template-columns: 1fr 80% 1fr;
  grid-template-rows: 1fr 80% 1fr;
  display: grid;

}

.game-container {
  display: grid;
}

.game {
  grid-row-start: 2;
  grid-column-start: 2;
}

.hand {
  align-self: end;
  margin: 8% 15%;
}

.border-clear-top {
  margin-top: 5%;
}
</style>
