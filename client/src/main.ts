import { onAuthStateChanged, User } from "firebase/auth";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { auth } from "./firebase";
import { router } from "./router";
import { useUserStore } from "./store/user";

const app = createApp(App).use(createPinia()).use(router);

const userStore = useUserStore();

onAuthStateChanged(auth, (firebaseUser: User | null) => {
  if (!userStore.initialAuthenticationChecked) {
    userStore.initialAuthenticationChecked = true;
    app.mount("#app");
  }
  if (!firebaseUser) {
    userStore.user = null;
  } else {
    userStore.handleSignIn(firebaseUser).then((memerUser) => {
      userStore.user = memerUser;
    });
  }
});
