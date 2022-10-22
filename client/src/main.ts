import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "vue";
import Chat from "vue3-beautiful-chat";
import App from "./App.vue";
import { useUser } from "./composables/useUser";
import router from "./router";
import "./styles/index.css";

const app = createApp(App);
app.use(router);
app.use(Chat);
app.component("FaIcon", FontAwesomeIcon);

const { anonymouslySignInUser } = useUser();

anonymouslySignInUser().then(() => app.mount("#app"));
