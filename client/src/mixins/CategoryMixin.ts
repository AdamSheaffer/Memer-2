import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Category } from '@/types/Category';
import gameService from '@/services/game';

const gameStore = namespace('game');

@Component
class CategoryMixin extends Vue {
  @gameStore.State((state) => state.categories)
  allCategories!: Category[]

  @gameStore.Action
  getCategories!: () => Promise<void>

  @gameStore.Mutation
  setGameTagOptions!: (opts: string[]) => void

  randomTagOptions(): string[] {
    if (!this.allCategories.length) {
      throw Error('Tried to select tag options but no categories available');
    }

    return gameService.pickRandomTagOptions(this.allCategories, 4);
  }
}
export default CategoryMixin;
