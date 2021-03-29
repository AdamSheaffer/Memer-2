import Vue from 'vue';
import Buefy from 'buefy';
import '../src/styles/_global.scss'

Vue.use(Buefy);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'centered',
  backgrounds: {
    values: [
      { name: 'White', value: '#fff' },
      { name: 'Dark Blue', value: '#21233e' },
      { name: 'Blue', value: '#30345f' },
      { name: 'Purple', value: '#8f4baa' },
    ],
  },
};
