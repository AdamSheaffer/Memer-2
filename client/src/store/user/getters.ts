import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { ModuleState } from './types';

const getters: GetterTree<ModuleState, RootState> = {
  isLoggedIn(state): boolean {
    return !!state.user;
  },
};

export default getters;
