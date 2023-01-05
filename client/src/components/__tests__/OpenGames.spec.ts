import { mount, RouterLinkStub } from "@vue/test-utils";
import { GlobalMountOptions } from "@vue/test-utils/dist/types";
import { Timestamp } from "firebase/firestore";
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { useRouter } from "vue-router";
import { useOpenGames } from "../../composables/useOpenGames";
import OpenGames from "../../views/OpenGames.vue";
import OpenGamesListItem from "../OpenGamesListItem.vue";
import { createFakeGame } from "./mocks/fakeGame";
import { mockUseOpenGamesValue } from "./mocks/useOpenGames";
import { mockUseRouterValue } from "./mocks/useRouter";

vi.mock("../../composables/useOpenGames");
vi.mock("vue-router");

const _useOpenGames = useOpenGames as Mock;
const _useRouter = useRouter as Mock;

beforeEach(() => {
  _useOpenGames.mockImplementation(mockUseOpenGamesValue);
  _useRouter.mockImplementation(mockUseRouterValue);
});

afterEach(() => {
  vi.clearAllMocks();
});

const globalMountingOptions: GlobalMountOptions = {
  stubs: {
    RouterLink: RouterLinkStub,
    FaIcon: { template: "<div></div>" },
    MemerLogo: { template: "<div></div>" },
  },
};

describe("OpenGames", () => {
  it("should display multiple open games list items", () => {
    _useOpenGames.mockImplementationOnce(() => mockUseOpenGamesValue(3));

    const wrapper = mount(OpenGames, { global: globalMountingOptions });
    const listItems = wrapper.findAllComponents(OpenGamesListItem);
    expect(listItems.length).toBe(3);
  });

  it("should show a link to create a new game", () => {
    _useOpenGames.mockImplementationOnce(() => mockUseOpenGamesValue(1));

    const wrapper = mount(OpenGames, { global: globalMountingOptions });
    const link = wrapper.find("[data-host-game-link]");

    expect(link.exists()).toBe(true);
    expect(link.text()).toContain("NEW GAME");
  });

  it("should show a message if there are no open games and a link to host one", () => {
    const wrapper = mount(OpenGames, { global: globalMountingOptions });

    expect(wrapper.text()).toContain("There aren't any open games right now");

    const link = wrapper.find("[data-host-game-link]");

    expect(link.exists()).toBe(true);
    expect(link.text()).toContain("NEW GAME");
  });

  it("should show game details in list item", () => {
    const mockValue = mockUseOpenGamesValue();
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60_000);
    mockValue.openGames.value = [
      createFakeGame({
        hostPhotoURL: "fake_image_url",
        pointsToWin: 3,
        safeForWork: true,
        maxPlayers: 6,
        beginDate: Timestamp.fromDate(fiveMinutesAgo),
      }),
    ];

    _useOpenGames.mockImplementationOnce(() => mockValue);

    const wrapper = mount(OpenGames, { global: globalMountingOptions });
    const listItem = wrapper.findComponent(OpenGamesListItem);

    // User Avatar
    const hostImg = listItem.find("[data-host-avatar]");
    expect(hostImg.attributes().src).toBe("fake_image_url");

    // Created Time
    const createdTime = listItem.find("[data-created-time]");
    expect(createdTime.text()).toBe("Created 5 minutes ago");

    // Points to Win
    const pointsToWin = listItem.findComponent("[data-pill-points-to-win]");
    expect(pointsToWin.text()).toBe("3");

    // Max Players
    const maxPlayers = listItem.findComponent("[data-pill-max-players]");
    expect(maxPlayers.text()).toBe("6");

    // SFW
    const sfw = listItem.findComponent("[data-pill-sfw]");
    expect(sfw.text()).toBe("SFW");
  });

  it("should route the user to the gameroom after clicking the join button", async () => {
    const routerMock = mockUseRouterValue();
    const openGamesMock = mockUseOpenGamesValue(1);
    _useRouter.mockImplementationOnce(() => routerMock);
    _useOpenGames.mockImplementationOnce(() => openGamesMock);

    const wrapper = mount(OpenGames, { global: globalMountingOptions });
    const listItem = wrapper.findComponent(OpenGamesListItem);
    const joinBtn = listItem.findComponent("[data-btn-join]");

    await joinBtn.trigger("click");

    expect(routerMock.push).toHaveBeenCalledWith(`/game/${openGamesMock.openGames.value[0].uid}`);
  });
});
