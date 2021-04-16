import SetupWizard from '../components/SetupWizard.vue';
import GameroomBackground from '../components/GameroomBackground.vue';

export default {
  title: 'Memer/SetupWizard',
  component: SetupWizard,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SetupWizard, GameroomBackground },
  template: `
    <gameroom-background>
      <div style="height: 100vh; width: 100vw">
        <setup-wizard v-bind="$props" />
      </div>
    </gameroom-background>
  `,
});

export const Basic = Template.bind({});
