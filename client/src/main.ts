import { createApp } from "vue";
import App from "./App.vue";
import { useUser } from "./composeables/useUser";
import router from "./router";
import "./styles/index.css";

const app = createApp(App);
app.use(router);

const { anonymouslySignInUser } = useUser();

anonymouslySignInUser().then(() => app.mount("#app"));
