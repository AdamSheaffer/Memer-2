import Button from "../components/Button.vue";

export default {
  title: "Memer/Button",
  component: Button,
  argTypes: {
    rounded: {
      control: { type: "boolean" },
      defaultValue: false
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: '<player-chip v-bind="$props" />'
});

export const Inactive = Template.bind({});

export const Active = Template.bind({});
Active.args = {
  ...Inactive.args,
  active: true
};
