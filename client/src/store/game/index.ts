import { Module } from 'vuex';
import { RootState } from '../types';
import { ModuleState } from './types';
import getters from './getters';
import mutations from './mutations';

const state: ModuleState = {
  game: null,
  players: [],
  hand: [],
};

const gameModule: Module<ModuleState, RootState> = {
  state,
  getters,
  mutations,
  namespaced: true,
};

export default gameModule;
