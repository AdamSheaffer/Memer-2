import { ActionTree } from 'vuex';
import { db } from '@/firebase';
import { Category } from '@/types/Category';
import { ModuleState } from './types';
import { RootState } from '../types';

const actions: ActionTree<ModuleState, RootState> = {
  async getCategories({ commit }) {
    const snapshot = await db.collection('categories').get();
    const categories = snapshot.docs.map((doc) => ({
      ...doc.data() as Category,
      id: doc.id,
    }));

    commit('setCategories', categories);
  },
};

export default actions;
