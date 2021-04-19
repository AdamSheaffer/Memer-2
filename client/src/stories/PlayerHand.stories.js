import PlayerHand from '../components/PlayerHand.vue';

export default {
  title: 'Memer/PlayerHand',
  component: PlayerHand,
  argTypes: {
    cards: {
      control: { type: 'object' },
      defaultValue: [
        {
          id: '1',
          top: null,
          bottom: 'Dope etsy store',
        },
        {
          id: '2',
          top: 'Trust me',
          bottom: 'Im a doctor',
        },
        {
          id: '3',
          top: null,
          bottom: 'Diet starts tomorrow',
        },
        {
          id: '4',
          top: 'When the teacer',
          bottom: 'Asks for a volunteer',
        },
        {
          id: '5',
          top: null,
          bottom: 'Fall of the Berlin Wall (1989)',
        },
        {
          id: '6',
          top: null,
          bottom: 'That can\'t be sanitary',
        },
        {
          id: '7',
          top: 'My NSA Agent',
          bottom: 'When I switch to incognito mode',
        },
      ],
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PlayerHand },
  template: `
    <div style="height: 100vh; width: 100vw">
      <div style="height: 100%; width: 64%; margin: 0 auto">
        <player-hand v-bind="$props" />
      </div>
    </div>
  `,
});

export const Basic = Template.bind({});