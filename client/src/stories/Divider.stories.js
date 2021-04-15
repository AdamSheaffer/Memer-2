import Divider from '../components/Divider.vue';
import GameroomBackground from '../components/GameroomBackground.vue';

export default {
  title: 'Memer/Divider',
  component: Divider,
  argTypes: {
    text: {
      control: { type: 'text' },
      defaultValue: 'or',
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Divider, GameroomBackground },
  template: `
    <gameroom-background>
      <div style="width:400px; height:400px; margin-top:8rem">
        <divider v-bind="$props">
        </divider>
      </div>
    </gameroom-background>
  `,
});

export const Default = Template.bind({});
