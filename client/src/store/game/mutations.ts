import { Card } from '@/types/Card';
import { Category } from '@/types/Category';
import { Game } from '@/types/Game';
import { Player } from '@/types/Player';
import { MutationTree } from 'vuex';
import { ModuleState } from './types';

const mutations: MutationTree<ModuleState> = {
  clearGameData(state) {
    state.game = null;
    state.players = [];
    state.hand = [];
  },
  setGame(state, payload: Game) {
    state.game = payload;
  },
  setPlayers(state, payload: Player[]) {
    state.players = payload;
  },
  setHand(state, payload: Card[]) {
    state.hand = payload;
  },
  setCategories(state, payload: Category[]) {
    state.categories = payload;
  },
  setGameTagOptions(state, payload: string[]) {
    if (state.game) {
      state.game.tagOptions = payload;
    }
  },
  setShowingSlideshow(state, payload: boolean) {
    state.showingSlideshow = payload;
  },
  setShowingWinningMeme(state, payload: boolean) {
    state.showingWinningMeme = payload;
  },
};

export default mutations;
