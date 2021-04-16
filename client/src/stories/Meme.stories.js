import Meme from '../components/Meme.vue';
import GameroomBackground from '../components/GameroomBackground.vue';

export default {
  title: 'Memer/Meme',
  component: Meme,
  argTypes: {
    top: {
      control: { type: 'text' },
      defaultValue: 'Hello',
    },
    bottom: {
      control: { type: 'text' },
      defaultValue: 'Hello',
    },
    imageURL: {
      control: { type: 'text' },
      defaultValue: 'https://media.giphy.com/media/dw7lCpFmsyfS0/giphy.gif',
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Meme, GameroomBackground },
  template: `
    <gameroom-background>
      <div style="height: 500px">
        <meme v-bind="$props" />
      </div>
    </gameroom-background>
  `,
});

export const Default = Template.bind({});
