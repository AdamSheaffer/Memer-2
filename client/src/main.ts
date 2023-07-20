import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "vue";
import Chat from "vue3-beautiful-chat";
import App from "./App.vue";
import { useUser } from "./composables/useUser";
import router from "./router";
import "./styles/index.css";

const { initializeUser } = useUser();

initializeUser().then(() => {
  const app = createApp(App);
  app.use(router);
  app.use(Chat);
  app.component("FaIcon", FontAwesomeIcon);
  app.mount("#app");
});
