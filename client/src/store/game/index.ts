import { Module } from 'vuex';
import { RootState } from '../types';
import { ModuleState } from './types';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const state: ModuleState = {
  game: null,
  players: [],
  hand: [],
  categories: [],
};

const gameModule: Module<ModuleState, RootState> = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};

export default gameModule;
