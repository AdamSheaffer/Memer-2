import { onAuthStateChanged, User } from "firebase/auth";
import { createApp } from "vue";
import App from "./App.vue";
import { auth } from "./firebase";

let userLoaded = false;
const app = createApp(App);
app.mount("#app");

onAuthStateChanged(auth, (user: User | null) => {
  if (!userLoaded) {
    userLoaded = true;
  }
});
