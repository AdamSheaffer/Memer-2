import Vue from 'vue';
import Buefy from 'buefy';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Chat from 'vue-beautiful-chat';
import icons from './icons';
import App from './App.vue';
import router from './router';
import store from './store';
import { auth } from './firebase';
import handleSignIn from './services/auth';

library.add(...icons);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: 'font-awesome-icon',
  defaultIconPack: 'fas',
  customIconPacks: {
    fas: {
      sizes: {
        default: 'lg',
        'is-small': '1x',
        'is-medium': '2x',
        'is-large': '3x',
      },
      iconPrefix: '',
    },
  },
});

Vue.use(Chat);

Vue.config.productionTip = false;

let userLoaded = false;

auth.onAuthStateChanged(async (user) => {
  if (!userLoaded) {
    if (user) {
      const profile = await handleSignIn(user);
      store.commit('user/setUser', profile);
    }
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');

    userLoaded = true;
  }
});
