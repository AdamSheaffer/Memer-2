import { onAuthStateChanged, User } from "firebase/auth";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { auth } from "./firebase";
import { handleSignIn } from "./services/user";
import { useUserStore } from "./store/user";

const app = createApp(App).use(createPinia());
const userStore = useUserStore();

onAuthStateChanged(auth, (firebaseUser: User | null) => {
  if (!userStore.initialAuthenticationChecked) {
    userStore.initialAuthenticationChecked = true;
    app.mount("#app");
  }
  if (!firebaseUser) {
    userStore.user = null;
  } else {
    handleSignIn(firebaseUser).then((memerUser) => {
      userStore.user = memerUser;
    });
  }
});
