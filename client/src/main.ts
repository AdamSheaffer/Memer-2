import { onAuthStateChanged, User } from "firebase/auth";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { auth } from "./firebase";
import router from "./router";
import { handleSignIn } from "./services/userService";
import { useUserStore } from "./store/user";
import "./styles/main.css";

const app = createApp(App);
app.use(router);
app.use(createPinia());

const userStore = useUserStore();

onAuthStateChanged(auth, async (firebaseUser: User | null) => {
  if (!firebaseUser) {
    userStore.user = null;
  } else {
    const memerUser = await handleSignIn(firebaseUser);
    userStore.user = memerUser;
  }
  if (!userStore.initialAuthenticationChecked) {
    userStore.initialAuthenticationChecked = true;
    app.mount("#app");
  }
});
