import { getDoc, getDocs } from "firebase/firestore";
import { defineStore } from "pinia";
import { categoriesCollection, gameDoc } from "../services/db";
import { Card, Category, Game, Maybe, Meme, Player } from "../types";
import { mapCollection, mapDoc } from "../utils/mapCollectionDocs";
import { useUserStore } from "./user";

const userStore = useUserStore();

export const useGameStore = defineStore("game", {
  state: () => ({
    game: null as Maybe<Game>,
    players: [] as Player[],
    hand: [] as Card[],
    categories: [] as Category[],
  }),
  actions: {
    async getGame(gameId: string) {
      const snapshot = await getDoc(gameDoc(gameId));
      this.game = mapDoc<Game>(snapshot);
    },

    async getCategories() {
      const snapshot = await getDocs(categoriesCollection);
      this.categories = mapCollection<Category>(snapshot);
    },
  },
  getters: {
    dataLoaded(): boolean {
      return Boolean(this.game && this.players.length && this.categories.length);
    },

    currentPlayer(): Player {
      const player = this.players.find((p) => p.uid === userStore.user?.uid);
      if (!player) throw Error("Current user not found in players list");

      return player;
    },

    host(): Player {
      const player = this.players.find((p) => p.uid === this.game?.hostId);
      if (!player) throw Error("No player is game host");

      return player;
    },

    isHost(): boolean {
      return this.game?.hostId === userStore.user?.uid;
    },

    currentUserIsJudge(): boolean {
      return this.game?.turn === userStore.user?.uid;
    },

    activePlayers(): Player[] {
      return this.players.filter((p) => !p.removed && p.isActive);
    },

    playerCount(): number {
      return this.activePlayers.length;
    },

    judge(): Player {
      const player = this.players.find((p) => p.uid === this.game?.turn);
      if (!player) throw Error("Couldn't find player for current turn");

      return player;
    },

    judgeIsPickingCategory(): boolean {
      return Boolean(this.dataLoaded && this.game?.tagOptions?.length && !this.game?.tagSelection);
    },

    judgeIsPickingGif(): boolean {
      return Boolean(this.dataLoaded && this.game?.tagSelection && !this.game.memeTemplate);
    },

    isSubmissionRound(): boolean {
      return Boolean(this.dataLoaded && this.game?.memeTemplate && !this.everyoneHasSubmitted);
    },

    isPickingWinner(): boolean {
      return this.everyoneHasSubmitted && !this.game?.winningMeme;
    },

    everyoneHasSubmitted(): boolean {
      if (!this.players.length || !this.dataLoaded) return false;

      return this.activePlayers.every((p) => {
        const isJudge = p.uid === this.judge?.uid;
        const hasSubmitted = !!p.memePlayed;
        return isJudge || hasSubmitted;
      });
    },

    playerSubmissions(): Meme[] {
      if (!this.everyoneHasSubmitted || !this.dataLoaded) return [];

      const judgeId = this.game?.turn;
      const submissions = this.activePlayers
        .filter((player) => player.uid !== judgeId)
        .map((player) => {
          if (!player.memePlayed)
            throw Error(`Attempted to get submission for player ${player.uid} but none was given`);
          return {
            top: player.memePlayed.top ?? "",
            bottom: player.memePlayed.bottom ?? "",
            photoURL: player.memePlayed.photoURL,
          };
        })
        .sort((a, b) => (a.bottom < b.bottom ? -1 : 1));

      return submissions;
    },

    roundWinner(): Maybe<Player> {
      if (!this.game || !this.game.roundWinner) {
        return null;
      }
      const winner = this.players?.find((p) => p.uid === this.game?.roundWinner);

      return winner ?? null;
    },

    gameWinner(): Maybe<Player> {
      if (!this.game || !this.game.winner) {
        return null;
      }
      const winner = this.players?.find((p) => p.uid === this.game?.winner);

      return winner ?? null;
    },

    nextPlayerTurn(): Maybe<Player> {
      if (!this.activePlayers.length) return null;

      const sortedPlayers = this.activePlayers.sort((a, b) => a.turnIndex - b.turnIndex);
      const playerIndex = sortedPlayers.findIndex((p) => p.uid === this.game?.turn);
      const nextIndex = playerIndex === this.players.length - 1 ? 0 : playerIndex + 1;
      return sortedPlayers[nextIndex];
    },
  },
});
