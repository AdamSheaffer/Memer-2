/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Meme from '../components/Meme.vue';

export default {
  title: 'Memer/Meme',
  component: Meme,
  argTypes: {
    imageURL: {
      control: { type: 'text' },
      defaultValue: 'https://media.giphy.com/media/AcfTF7tyikWyroP0x7/giphy.gif',
    },
    top: {
      control: { type: 'text' },
      defaultValue: 'Hello',
    },
    bottom: {
      control: { type: 'text' },
      defaultValue: 'Hello',
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Meme },
  template: '<meme v-bind="$props" />',
});

export const Basic = Template.bind({});
