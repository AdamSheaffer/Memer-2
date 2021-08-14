import { Meme } from '@/types/Meme';
import { Player } from '@/types/Player';
import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { state as userState } from '../user';
import { ModuleState } from './types';

type Getters = {
  dataLoaded: boolean
  isHost: boolean
  isYourTurn: boolean
  player: Player
  activePlayers: Player[]
  playerCount: number
  playerTurn: Player | undefined
  isPickingCategory: boolean
  isPickingGif: boolean
  isSubmissionRound: boolean
  playerHasSubmitted: boolean
  everyoneHasSubmitted: boolean
  playerSubmissions: Meme[]
  nextPlayerTurn: Player | null
  isPickingWinner: boolean,
  roundWinner: Player | null
}

type ModuleGetters = {
  [K in keyof Getters]: (
    state: ModuleState,
    getters: Getters,
    rootContext: RootState
  ) => Getters[K]
}

const getters: GetterTree<ModuleState, RootState> & ModuleGetters = {
  dataLoaded(state): boolean {
    return (
      !!state.game
      && !!state.players?.length
      && !!state.categories?.length);
  },

  player(state): Player {
    const player = state.players?.find((p) => p.uid === userState.user?.uid);
    if (!player) throw Error('Current user not found in players list');

    return player;
  },

  isHost(state): boolean {
    return state.game?.hostId === userState.user?.uid;
  },

  isYourTurn(state): boolean {
    return state.game?.turn === userState.user?.uid;
  },

  activePlayers(state): Player[] {
    return state.players.filter((p) => !p.removed && p.isActive);
  },

  playerCount(state, { activePlayers }): number {
    return activePlayers.length;
  },

  playerTurn(state): Player | undefined {
    return state.players.find((p) => p.uid === state.game?.turn);
  },

  isPickingCategory(state, { dataLoaded }): boolean {
    if (!dataLoaded) return false;

    return !!state.game?.tagOptions?.length && !state.game?.tagSelection;
  },

  isPickingGif(state, { dataLoaded }): boolean {
    if (!dataLoaded) return false;

    return !!state.game?.tagSelection && !state.game.memeTemplate;
  },

  playerHasSubmitted(state, { isSubmissionRound, player }): boolean {
    return isSubmissionRound && !!player.memePlayed;
  },

  isSubmissionRound(state, { everyoneHasSubmitted, dataLoaded }): boolean {
    if (!dataLoaded) return false;

    return !!state.game?.memeTemplate && !everyoneHasSubmitted;
  },

  everyoneHasSubmitted(state, { playerTurn, activePlayers, dataLoaded }): boolean {
    if (!state.players || !dataLoaded) return false;

    return activePlayers.every((p) => {
      const isJudge = p.uid === playerTurn?.uid;
      const hasSubmitted = !!p.memePlayed;
      return isJudge || hasSubmitted;
    });
  },

  playerSubmissions(state, { everyoneHasSubmitted, activePlayers, dataLoaded }): Meme[] {
    if (!everyoneHasSubmitted || !dataLoaded) return [];

    const judgeId = state.game?.turn;
    const subs = activePlayers.filter((player) => player.uid !== judgeId)
      .map((player) => {
        if (!player.memePlayed) throw Error(`Attempted to get submission for player ${player.uid} but none was given`);
        return {
          top: player.memePlayed.top || '',
          bottom: player.memePlayed.bottom || '',
          photoURL: player.memePlayed.photoURL,
        };
      })
      .sort((a, b) => (a.bottom < b.bottom ? -1 : 1));

    return subs || [];
  },

  nextPlayerTurn(state, { activePlayers }): Player | null {
    if (!activePlayers.length) return null;

    const sortedPlayers = activePlayers.sort((a, b) => a.turnIndex - b.turnIndex);
    const playerIndex = sortedPlayers.findIndex((p) => p.uid === state.game?.turn);
    const nextIndex = playerIndex === state.players.length - 1 ? 0 : playerIndex + 1;
    return sortedPlayers[nextIndex];
  },

  isPickingWinner(state, { everyoneHasSubmitted }): boolean {
    return everyoneHasSubmitted && !state.showingSlideshow && !state.game?.winningMeme;
  },

  roundWinner(state): Player | null {
    if (!state.game || !state.game.roundWinner) {
      return null;
    }
    const winner = state.players?.find((p) => p.uid === state.game?.roundWinner);

    return winner || null;
  },
};

export default getters;
