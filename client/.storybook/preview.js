import Vue from 'vue';
import Buefy from 'buefy';
import { library } from '@fortawesome/fontawesome-svg-core';
import icons from '../src/icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import '../src/styles/_global.scss';

library.add(...icons);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: 'font-awesome-icon',
  defaultIconPack: 'fas',
  customIconPacks: {
    fas: {
      sizes: {
        default: 'lg',
        'is-small': '1x',
        'is-medium': '2x',
        'is-large': '3x'
      },
      iconPrefix: ''
    }
  }
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
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
