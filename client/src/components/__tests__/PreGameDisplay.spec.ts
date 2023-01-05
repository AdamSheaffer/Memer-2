import { mount, RouterLinkStub } from "@vue/test-utils";
import { GlobalMountOptions } from "@vue/test-utils/dist/types";
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { useDeck } from "../../composables/useDeck";
import { useGame } from "../../composables/useGame";
import { useUser } from "../../composables/useUser";
import PreGameDisplay from "../PreGameDisplay.vue";
import { getFakePlayers } from "./mocks/fakePlayers";
import { mockUseDeckValue } from "./mocks/useDeck";
import { mockUseGameValue } from "./mocks/useGame";
import { mockUseUserValue } from "./mocks/useUser";

vi.mock("../../composables/useGame");
vi.mock("../../composables/useUser");
vi.mock("../../composables/useDeck");

const _useUser = useUser as Mock;
const _useGame = useGame as Mock;
const _useDeck = useDeck as Mock;
const [currentPlayer] = getFakePlayers(1);

beforeEach(() => {
  _useGame.mockImplementation(mockUseGameValue);
  _useDeck.mockImplementation(mockUseDeckValue);
  _useUser.mockImplementation(() =>
    mockUseUserValue({
      uid: currentPlayer.uid,
      username: currentPlayer.username,
      photoURL: currentPlayer.photoURL,
    })
  );
});

afterEach(() => {
  vi.clearAllMocks();
});

const globalMountingOptions: GlobalMountOptions = {
  stubs: { RouterLink: RouterLinkStub, FaIcon: { template: "<div></div>" } },
};

describe("PreGameDisplay", () => {
  it("hides start button for non-host players and shows waiting on players message", () => {
    const players = [...getFakePlayers(1), currentPlayer];
    _useGame.mockImplementation(() =>
      mockUseGameValue({
        game: { maxPlayers: 7, hostId: players[0].uid },
        players,
        host: players[0], // not current user
      })
    );
    const wrapper = mount(PreGameDisplay, {
      props: { gameId: "sample_game_id" },
      global: globalMountingOptions,
    });

    const startBtn = wrapper.find("[data-start-button]");
    const msg = wrapper.find("[data-waiting-on-players]");

    expect(startBtn.exists()).toBe(false);
    expect(msg.text()).toBe("WAITING ON MORE PLAYERS...");
  });

  it("hides start button for non-host players and shows waiting on host message with minimum players", () => {
    const players = [...getFakePlayers(4), currentPlayer];
    const host = players[3]; // Not current user
    _useGame.mockImplementation(() =>
      mockUseGameValue({
        game: { maxPlayers: 7, hostId: host.uid },
        players,
        host,
      })
    );
    const wrapper = mount(PreGameDisplay, {
      props: { gameId: "sample_game_id" },
      global: globalMountingOptions,
    });

    const startBtn = wrapper.find("[data-start-button]");
    const msg = wrapper.find("[data-waiting-on-host]");

    expect(startBtn.exists()).toBe(false);
    expect(msg.text()).toBe(`WAITING ON ${host.username} TO START THE GAME...`);
  });

  it("disables button and shows message if host is waiting on players", async () => {
    const players = [currentPlayer, ...getFakePlayers(1)];
    const mockedUseUserValue = mockUseGameValue({
      game: { maxPlayers: 7, hostId: currentPlayer.uid },
      players,
      host: currentPlayer,
      userIsHost: true,
    });
    _useGame.mockImplementation(() => mockedUseUserValue);

    const wrapper = mount(PreGameDisplay, {
      props: { gameId: "sample_game_id" },
      global: globalMountingOptions,
    });

    const msg = wrapper.find("[data-waiting-on-players]");
    const btn = wrapper.findComponent("[data-start-button]");
    await btn.trigger("click");

    expect(msg.exists()).toBe(true);
    expect(msg.text()).toBe("WAITING ON MORE PLAYERS...");
    expect(btn.attributes().disabled).toBe("");
    expect(mockedUseUserValue.startGame).not.toHaveBeenCalled();
  });

  it("enables button for host and calls start game when clicked", async () => {
    const players = [currentPlayer, ...getFakePlayers(4)];
    const mockedUseGameValue = mockUseGameValue({
      game: { maxPlayers: 7, hostId: currentPlayer.uid },
      players,
      host: currentPlayer,
      userIsHost: true,
    });
    _useGame.mockImplementation(() => mockedUseGameValue);

    const mockedUseDeckValue = mockUseDeckValue();
    _useDeck.mockImplementation(() => mockedUseDeckValue);

    const wrapper = mount(PreGameDisplay, {
      props: { gameId: "sample_game_id" },
      global: globalMountingOptions,
    });

    const msg = wrapper.find("[data-waiting-on-players]");
    const btn = wrapper.find("[data-start-button]");
    await btn.trigger("click");

    expect(msg.exists()).toBe(false);
    expect(btn.attributes().disabled).toBeFalsy();
    expect(mockedUseGameValue.startGame).toHaveBeenCalled();
    expect(mockedUseDeckValue.dealToPlayers).toHaveBeenCalled();
  });
});
