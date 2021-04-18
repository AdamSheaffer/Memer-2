import { Card } from '@/types/Card';
import { Game } from '@/types/Game';
import { Player } from '@/types/Player';
import { MutationTree } from 'vuex';
import { ModuleState } from './types';

const mutations: MutationTree<ModuleState> = {
  setGame(state, payload: Game) {
    state.game = payload;
  },
  setPlayers(state, payload: Player[]) {
    state.players = payload;
  },
  setHand(state, payload: Card[]) {
    state.hand = payload;
  },
};

export default mutations;
