import PlayerChip from '../components/PlayerChip.vue';

export default {
  title: 'Memer/PlayerChip',
  component: PlayerChip,
  argTypes: {
    player: {
      control: { type: 'object' },
      defaultValue: {
        uid: 'abc123',
        fullName: 'Jeff Lebowski',
        username: 'The Dude',
        photoURL: 'https://bamfstyle.com/wp-content/uploads/2016/04/dude6-main.jpg',
        isActive: false,
        score: 3,
        roles: { player: true },
      },
    },
    pointsToWin: {
      control: { type: 'range', min: 1, max: 10 },
      defaultValue: 7,
    },
    active: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PlayerChip },
  template: '<player-chip v-bind="$props" />',
});

export const Inactive = Template.bind({});
