import { MutationTree } from 'vuex';
import { User } from '@/types/User';
import { ModuleState } from './types';

const mutations: MutationTree<ModuleState> = {
  setUser(state, payload: User) {
    state.user = payload;
  },
};

export default mutations;
