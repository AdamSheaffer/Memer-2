import GameroomBackground from '../components/GameroomBackground.vue';

export default {
  title: 'Memer/GameroomBackground',
  component: GameroomBackground,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { GameroomBackground },
  template: `
    <gameroom-background v-bind="$props">
      <template v-slot>${args.slotcontent}</template>
    </gameroom-background>
  `,
});

export const Empty = Template.bind({});
Empty.args = { slotcontent: '' };

export const WithContent = Template.bind({});
WithContent.args = {
  slotcontent: '<b-button type="is-success" rounded>START</b-button>',
};
