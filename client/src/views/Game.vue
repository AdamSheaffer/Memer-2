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
          <template-builder
            class="border-clear-top pt-5"
            v-if="isPickingCategory || (isPickingGif && isYourTurn)"
            @category-select="categorySelect"
            @gif-select="gifSelect"
            :category-options="game.tagOptions"
            :gif-options="game.gifOptionURLs"
            :is-picking="isYourTurn"
            :turn-username="playerTurn && playerTurn.username"/>
          <div v-if="isPickingGif && !isYourTurn" class="border-clear-top">
            <category-preview :turnUsername="playerTurn.username" :category="game.tagSelection"/>
          </div>
          <div v-if="isSubmissionRound" class="border-clear-top">
            <div class="is-flex is-justify-content-center mt-2">
              <meme-card :imageURL="game.memeTemplate.photoURL" class="mt-3" />
            </div>
          </div>
          <div class="hand">
            <h2 class="is-size-4 mb-2 has-text-success has-text-centered">
              {{ actionHeader }}
            </h2>
            <player-hand
              v-show="showHand"
              @select="playCaption"
              :cards="hand"
              :clickable="!playerHasSubmitted && !isYourTurn" />
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
import PlayerHand from '@/components/PlayerHand.vue';
import Players from '@/components/Players.vue';
import TemplateBuilder from '@/components/TemplateBuilder.vue';
import CategoryPreview from '@/components/CategoryPreview.vue';
import MemeCard from '@/components/Meme.vue';
import UserMixin from '@/mixins/UserMixin';
import GameMixin from '@/mixins/GameMixin';
import PlayerMixin from '@/mixins/PlayerMixin';
import HandMixin from '@/mixins/HandMixin';
import CategoryMixin from '@/mixins/CategoryMixin';
import { Game } from '@/types/Game';
import { Player } from '@/types/Player';
import { Meme } from '@/types/Meme';
import { Card } from '@/types/Card';
import gameService from '@/services/game';
import gifService from '@/services/gif';
import firebase from '@/firebase';

@Component({
  components: {
    GameroomBackground,
    PlayerChip,
    PlayerHand,
    Players,
    TemplateBuilder,
    CategoryPreview,
    MemeCard,
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

  get isPickingCategory(): boolean {
    if (!this.dataLoaded) return false;

    return !!this.game?.tagOptions?.length && !this.game?.tagSelection;
  }

  get isPickingGif(): boolean {
    if (!this.dataLoaded) return false;

    return !!this.game?.tagSelection && !this.game.memeTemplate;
  }

  get isSubmissionRound(): boolean {
    if (!this.dataLoaded) return false;

    return !!this.game?.memeTemplate && !this.everyoneHasSubmitted;
  }

  get everyoneHasSubmitted(): boolean {
    if (!this.players) return false;

    return this.players?.every((p) => {
      const isJudge = p.uid === this.playerTurn?.uid;
      const hasSubmitted = !!p.memePlayed;
      return isJudge || hasSubmitted;
    });
  }

  get playerTurn(): Player | undefined {
    return this.players?.find((p) => p.uid === this.game?.turn);
  }

  get playerHasSubmitted(): boolean {
    return this.isSubmissionRound && !!this.player.memePlayed;
  }

  get showHand(): boolean {
    if (this.isPickingCategory) return false;
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

  get player(): Player {
    const player = this.players?.find((p) => p.uid === this.user.uid);
    if (!player) throw Error('Current user not found in players list');

    return player;
  }

  get actionHeader(): string | null {
    const { isSubmissionRound, isYourTurn } = this;

    if (isSubmissionRound && isYourTurn) {
      return 'PLAYERS ARE SUBMITTING';
    }

    if (isSubmissionRound && !isYourTurn) {
      if (this.player.memePlayed) {
        return 'WAITING ON OTHER PLAYERS';
      }

      return 'PICK A CAPTION';
    }

    return null;
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
  }

  playCaption(card: Card): Promise<void> {
    const memePlayed: Meme = {
      ...this.game?.memeTemplate,
      top: card.top,
      bottom: card.bottom,
    };

    return gameService.updatePlayer(this.gameId, this.user.uid, { memePlayed });
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
  margin: 0 15% 8%;
  align-self: center;
}

.border-clear-top {
  margin-top: 5%;
}
</style>
