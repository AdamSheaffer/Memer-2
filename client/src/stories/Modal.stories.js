import Modal from '../components/Modal.vue';
import GameroomBackground from '../components/GameroomBackground.vue';

export default {
  title: 'Memer/Modal',
  component: Modal,
  argTypes: {
    blur: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    dark: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Modal, GameroomBackground },
  template: `
  <gameroom-background>
    <div style="height: 100vh; width: 100vw">
      <div style="height: 80vh; width: 400px">
        <modal v-bind="$props">
          <template>
            <p>CONTENT GOES HERE</p>
          </template>
        </modal>
      </div>
    </div>
  </gameroom-background>
  `,
});

export const Basic = Template.bind({});
