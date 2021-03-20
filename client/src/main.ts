import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import App from './App.vue';
import router from './router';
import store from './store';
import { auth } from './firebase';

Vue.use(Buefy);

Vue.config.productionTip = false;

let userLoaded = false;

auth.onAuthStateChanged(() => {
  if (!userLoaded) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');

    userLoaded = true;
  }
});
