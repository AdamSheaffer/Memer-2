import Vue from 'vue';
import Buefy from "buefy";

Vue.use(Buefy);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
