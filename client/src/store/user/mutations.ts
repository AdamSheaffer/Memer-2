import { MutationTree } from 'vuex';
import { ModuleState, User } from './types';

const mutations: MutationTree<ModuleState> = {
  setUser(state, payload: User) {
    state.user = payload;
  },
};

export default mutations;
