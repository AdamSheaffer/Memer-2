import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "vue";
import Chat from "vue3-beautiful-chat";
import App from "./App.vue";
import { useUser } from "./composables/useUser";
import router from "./router";
import { SoundsPlugin } from "./services/sounds";
import "./styles/index.css";

const app = createApp(App);
app.use(router);
app.use(Chat);
app.use(SoundsPlugin);
app.component("FaIcon", FontAwesomeIcon);

const { anonymouslySignInUser } = useUser();

anonymouslySignInUser().then(() => app.mount("#app"));
