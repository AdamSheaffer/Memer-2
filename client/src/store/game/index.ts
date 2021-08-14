import { Module } from 'vuex';
import { ModuleState } from './types';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import { RootState } from '../types';

const state: ModuleState = {
  game: null,
  players: [],
  hand: [],
  categories: [],
  showingSlideshow: false,
  showingWinningMeme: false,
};

const gameModule: Module<ModuleState, RootState> = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};

export default gameModule;
