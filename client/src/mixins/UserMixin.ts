import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { User } from '@/types/User';

const userStore = namespace('user');

@Component
class UserMixin extends Vue {
  @userStore.Getter
  public isLoggedIn!: boolean

  @userStore.State((state) => state.user)
  public user?: User
}
export default UserMixin;
