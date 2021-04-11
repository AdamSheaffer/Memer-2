import Avatar from '../components/Avatar.vue';

export default {
  title: 'Memer/Avatar',
  component: Avatar,
  argTypes: {
    imageURL: {
      control: { type: 'text' },
      defaultValue: 'https://bamfstyle.com/wp-content/uploads/2016/04/dude6-main.jpg',
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Avatar },
  template: `
    <avatar v-bind="$props">
    </avatar>
  `,
});

export const Default = Template.bind({});
