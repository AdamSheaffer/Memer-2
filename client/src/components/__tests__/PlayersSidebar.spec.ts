import { mount, RouterLinkStub } from "@vue/test-utils";
import { GlobalMountOptions } from "@vue/test-utils/dist/types";
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { useRouter } from "vue-router";
import { useGame } from "../../composables/useGame";
import PlayersSidebar from "../PlayersSidebar.vue";
import { getFakePlayers } from "./mocks/fakePlayers";
import { mockUseGameValue } from "./mocks/useGame";
import { mockUseRouterValue } from "./mocks/useRouter";

vi.mock("vue-router");
vi.mock("../../composables/useGame");

const _useRouter = useRouter as Mock;
const _useGame = useGame as Mock;

beforeEach(() => {
  _useRouter.mockImplementation(mockUseRouterValue);
  _useGame.mockImplementation(mockUseGameValue);
});

afterEach(() => {
  vi.clearAllMocks();
});

const globalMountingOptions: GlobalMountOptions = {
  stubs: {
    RouterLink: RouterLinkStub,
    FaIcon: { template: "<div></div>" },
  },
};

describe("PlayersSidebar", () => {
  it("should show all active players", () => {
    const players = getFakePlayers(3);
    const mock = mockUseGameValue({ activePlayers: players });
    _useGame.mockImplementationOnce(() => mock);

    const wrapper = mount(PlayersSidebar, { global: globalMountingOptions });
    const playerListItems = wrapper.findAll("[data-player]");

    expect(playerListItems.length).toBe(3);
    expect(playerListItems[0].text()).toBe(players[0].username);
    expect(playerListItems[0].find("img").attributes("src")).toBe(players[0].photoURL);

    expect(playerListItems[1].text()).toBe(players[1].username);
    expect(playerListItems[1].find("img").attributes("src")).toBe(players[1].photoURL);

    expect(playerListItems[2].text()).toBe(players[2].username);
    expect(playerListItems[2].find("img").attributes("src")).toBe(players[2].photoURL);
  });

  it("should indicate the current judge", () => {
    const players = getFakePlayers(5);
    const judge = players[2];
    const mock = mockUseGameValue({
      activePlayers: players,
      game: { turn: judge.uid },
      judge,
    });
    _useGame.mockImplementationOnce(() => mock);

    const wrapper = mount(PlayersSidebar, { global: globalMountingOptions });

    // Should only be one indicator
    expect(wrapper.findAll("[data-judge-indicator]").length).toBe(1);

    const playerListItems = wrapper.findAll("[data-player]");
    const expectedJudgeListItem = playerListItems[2];
    const indicator = expectedJudgeListItem.find("[data-judge-indicator]");

    expect(indicator.exists()).toBe(true);
  });

  it("should indicate which users have submitted", () => {
    const [p1, p2, p3, p4] = getFakePlayers(4);
    p1.memePlayed = { bottom: "FOO", top: null };
    p2.memePlayed = { bottom: "BAR", top: null };
    p3.memePlayed = null;
    p4.memePlayed = null;

    const mock = mockUseGameValue({
      activePlayers: [p1, p2, p3, p4],
      game: { turn: p4.uid },
      judge: p4,
    });
    _useGame.mockImplementationOnce(() => mock);

    const wrapper = mount(PlayersSidebar, { global: globalMountingOptions });
    const [li1, li2, li3, li4] = wrapper.findAll("[data-player]");

    expect(li1.find("[data-submitted-indicator]").exists()).toBe(true);
    expect(li2.find("[data-submitted-indicator]").exists()).toBe(true);
    expect(li3.find("[data-submitted-indicator]").exists()).toBe(false);
    expect(li4.find("[data-submitted-indicator]").exists()).toBe(false);
  });
});
