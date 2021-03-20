import Vue from 'vue';
import Vuex from 'vuex';
import { RootState } from './types';
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    name: 'MEMER',
  },
  modules: {
    user,
  },
});
