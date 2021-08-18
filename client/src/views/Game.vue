<template>
  <div id="game-root">
    <gameroom-background>
      <waiting-to-start v-if="game && !game.hasStarted" @start="startGame" />
      <div v-if="dataLoaded">
        <players :game="game" :players="players" :current-player-id="user.uid" />
      </div>
      <div v-if="dataLoaded" class="game-table">
        <div class="game">
          <div class="play-area">
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
            <div v-if="isPickingWinner" class="border-clear-top pt-3 mb-5">
              <voting-round
                :isJudge="isYourTurn"
                :submissions="playerSubmissions"
                :photoURL="game.memeTemplate.photoURL"
                @select="pickWinner" />
            </div>
            <div class="hand">
              <action-header />
              <player-hand
                v-show="showHand"
                @select="playCaption"
                :cards="hand"
                :clickable="!playerHasSubmitted && !isYourTurn" />
            </div>
            <submission-slideshow
              v-if="showingSlideshow"
              :submissions="playerSubmissions"
              @finished="setShowingSlideshow(false)"/>
            <div v-if="game.winningMeme">
              <winning-modal @start-new-game="resetGame"/>
            </div>
          </div>
        </div>
      </div>
    </gameroom-background>
    <chat :game-id="gameId" :players="players" />
  </div>
</template>

<script lang="ts">
import { Mixins, Component, Watch } from 'vue-property-decorator';
import GameroomBackground from '@/components/GameroomBackground.vue';
import WaitingToStart from '@/components/WaitingToStart.vue';
import PlayerChip from '@/components/PlayerChip.vue';
import PlayerHand from '@/components/PlayerHand.vue';
import Players from '@/components/Players.vue';
import ActionHeader from '@/components/ActionHeader.vue';
import TemplateBuilder from '@/components/TemplateBuilder.vue';
import CategoryPreview from '@/components/CategoryPreview.vue';
import MemeCard from '@/components/Meme.vue';
import SubmissionSlideshow from '@/components/SubmissionSlideshow.vue';
import VotingRound from '@/components/VotingRound.vue';
import Modal from '@/components/Modal.vue';
import WinningModal from '@/components/WinningModal.vue';
import Chat from '@/components/Chat.vue';
import UserMixin from '@/mixins/UserMixin';
import PlayerMixin from '@/mixins/PlayerMixin';
import HandMixin from '@/mixins/HandMixin';
import CategoryMixin from '@/mixins/CategoryMixin';
import { Game } from '@/types/Game';
import { Player } from '@/types/Player';
import { Meme } from '@/types/Meme';
import { Card } from '@/types/Card';
import gameService from '@/services/game';
import gifService from '@/services/gif';
import firebase, { db } from '@/firebase';
import { namespace } from 'vuex-class';

const gameStore = namespace('game');

@Component({
  components: {
    ActionHeader,
    GameroomBackground,
    WaitingToStart,
    PlayerChip,
    PlayerHand,
    Players,
    TemplateBuilder,
    CategoryPreview,
    MemeCard,
    SubmissionSlideshow,
    VotingRound,
    Modal,
    WinningModal,
    Chat,
  },
})
export default class GameRoom extends Mixins(
  UserMixin, PlayerMixin, HandMixin, CategoryMixin,
) {
  @gameStore.State((state) => state.game)
  public game!: Game | null

  @gameStore.State
  public readonly showingSlideshow!: boolean;

  @gameStore.Getter
  public readonly player!: Player;

  @gameStore.Getter
  public readonly isHost!: boolean;

  @gameStore.Getter
  public readonly isYourTurn!: boolean;

  @gameStore.Getter
  public readonly dataLoaded!: boolean

  @gameStore.Getter
  public readonly playerTurn: Player | undefined;

  @gameStore.Getter
  public readonly isPickingCategory!: boolean;

  @gameStore.Getter
  public readonly isPickingGif!: boolean

  @gameStore.Getter
  public readonly isSubmissionRound!: boolean;

  @gameStore.Getter
  public readonly playerHasSubmitted!: boolean;

  @gameStore.Getter
  public readonly everyoneHasSubmitted!: boolean;

  @gameStore.Getter
  public readonly playerSubmissions!: Meme[];

  @gameStore.Getter
  nextPlayerTurn!: Player | null;

  @gameStore.Getter
  public readonly isPickingWinner!: boolean

  @gameStore.Getter
  public readonly roundWinner!: Player | null

  @gameStore.Mutation
  setGame!: (game: Game) => void

  @gameStore.Mutation
  public setShowingSlideshow!: (show: boolean) => void

  get gameId(): string {
    return this.$route.params.gameId;
  }

  get showHand(): boolean {
    if (this.isPickingCategory) return false;
    if (this.isPickingGif && this.isYourTurn) return false;
    if (this.everyoneHasSubmitted) return false;

    return true;
  }

  async mounted(): Promise<void> {
    this.trackGame(this.gameId);
    this.trackPlayers(this.gameId);
    this.trackPlayerHand(this.gameId, this.user.uid);
    await this.getCategories();
  }

  trackGame(gameId: string): void {
    db.collection('games').doc(gameId).onSnapshot((snapshot) => {
      const data = snapshot.data() as Game;
      this.setGame(data);
    });
  }

  startGame(): void {
    const tagOptions = this.randomTagOptions();
    gameService.update({
      tagOptions,
      turn: this.user.uid,
      hasStarted: true,
    }, this.gameId);
  }

  dealCards(): Promise<void> {
    if (!this.players) {
      throw Error('No players in game to deal to');
    }
    const playerIds = this.players.map((p) => p.uid);
    return gameService.dealToAllPlayers(this.gameId, playerIds);
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

  async playCaption(card: Card): Promise<void> {
    if (!card.id) throw Error('Attempted to play a card with no ID');

    const memePlayed: Meme = {
      ...this.game?.memeTemplate,
      top: card.top,
      bottom: card.bottom,
    };

    await gameService.updatePlayer(this.gameId, this.user.uid, { memePlayed });
    return gameService.removeCard(this.gameId, this.user.uid, card.id);
  }

  async pickWinner(card: Card): Promise<void> {
    const roundWinner = this.players?.find((p) => {
      const submittedTop = p.memePlayed?.top?.toUpperCase() || '';
      const submittedBottom = p.memePlayed?.bottom?.toUpperCase() || '';

      return (
        submittedTop === card.top.toUpperCase()
        && submittedBottom === card.bottom.toUpperCase());
    });

    const winningMeme: Meme = {
      top: card.top || null,
      bottom: card.bottom || null,
      photoURL: this.game?.memeTemplate?.photoURL,
    };

    if (!roundWinner) throw Error('Could not find winning player');

    const newScore = (roundWinner.score || 0) + 1;
    const isGameWinner = newScore >= (this.game?.pointsToWin || Number.MAX_VALUE);

    const pointUpdate: Game = isGameWinner
      ? { winner: roundWinner.uid }
      : { roundWinner: roundWinner.uid };

    await gameService.update({
      ...pointUpdate,
      winningMeme,
      winner: isGameWinner ? roundWinner.uid : null,
    }, this.gameId);

    await gameService.updatePlayer(this.gameId, roundWinner.uid, {
      score: (roundWinner.score || 0) + 1,
    });
  }

  async resetRound(): Promise<void> {
    if (!this.nextPlayerTurn) {
      throw Error('Cannot determine next player');
    }
    const nextTurn = this.nextPlayerTurn.uid;
    const tagOptions = this.randomTagOptions();
    const players = this.players || [];
    gameService.resetRound(this.gameId, nextTurn, tagOptions, players);
  }

  async resetGame(): Promise<void> {
    if (!this.isHost) return;

    const startingTurn = this.nextPlayerTurn?.uid ?? this.player.uid;
    const tagOptions = this.randomTagOptions();

    await gameService.resetGame(this.gameId, this.players ?? [], startingTurn, tagOptions);
  }

  @Watch('game')
  async checkForNewlyStartedGame(newVal: Game, oldVal: Game | null): Promise<void> {
    if (!oldVal) return;

    const justStarted = newVal.hasStarted && !oldVal.hasStarted;

    if (justStarted && this.isHost) {
      const tagOptions = this.randomTagOptions();

      await Promise.all([
        gameService.update({ tagOptions }, this.gameId),
        this.dealCards(),
      ]);
    }
  }

  @Watch('game')
  checkForRoundWinner(newVal: Game, oldVal: Game | null): void {
    if (!oldVal) return;

    const hasRoundWinner = newVal.roundWinner && !oldVal.roundWinner;

    if (hasRoundWinner && this.nextPlayerTurn === this.player) {
      setTimeout(() => {
        this.resetRound();
      }, 7000);
    }
  }

  @Watch('everyoneHasSubmitted')
  showSlideshow(newVal: boolean, oldVal: boolean): void {
    if (newVal === true && !oldVal) {
      this.setShowingSlideshow(true);
    }
  }
}
</script>

<style lang="scss" scoped>

#game-root, .play-area, .game-table {
  width: 100%;
  height: 100%;
}

.game-table {
  display: grid;
  grid-template-columns: 1fr 80% 1fr;
  grid-template-rows: 1fr 80% 1fr;

}

.play-area {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
}

.game {
  grid-row-start: 2;
  grid-column-start: 2;
}

.hand {
  align-self: end;
  margin: 0 15% 8%;
  justify-self: center;
}

.border-clear-top {
  margin-top: 7.5%;
}
</style>
