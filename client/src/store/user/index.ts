import { Module } from 'vuex';
import { RootState } from '../types';
import { ModuleState } from './types';
import getters from './getters';
import mutations from './mutations';

export const state: ModuleState = {
  user: null,
};

const userModule: Module<ModuleState, RootState> = {
  state,
  getters,
  mutations,
  namespaced: true,
};

export default userModule;
