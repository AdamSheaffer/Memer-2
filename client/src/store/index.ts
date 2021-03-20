import Vue from 'vue';
import Vuex, { MutationTree } from 'vuex';
import { RootState } from './types';
import user from './user';

Vue.use(Vuex);

const rootState: RootState = {
  name: 'MEMER',
  playersOnline: 0,
};

const mutations: MutationTree<RootState> = {
  setPlayersOnline(state, payload: number) {
    state.playersOnline = payload;
  },
};

export default new Vuex.Store<RootState>({
  state: rootState,
  mutations,
  modules: { user },
});
