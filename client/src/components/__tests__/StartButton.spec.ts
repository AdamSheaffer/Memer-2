import { mount, RouterLinkStub } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { Player, User } from "../../../../types";
import PreGameDisplay from "../PreGameDisplay.vue";

// useUser Mocks
const mockUser = ref<Partial<User>>({ uid: "abc" });

// useGame Mocks
const mockStartGameFn = vi.fn();
const mockPlayers = ref<Partial<Player>[]>([]);
const mockActivePlayers = ref<Partial<Player>[]>([]);
const mockUserIsHost = ref(false);
const mockHost = ref<Partial<Player>>({ uid: "1", username: "The Dude" });

// useDeck Mocks
const mockDealToPlayers = vi.fn();

describe("PreGameDisplay", () => {
  vi.mock("../../composables/useGame", () => ({
    useGame: () => ({
      activePlayers: mockActivePlayers,
      players: mockPlayers,
      startGame: mockStartGameFn,
      userIsHost: mockUserIsHost,
      host: mockHost,
    }),
  }));
  vi.mock("../../composables/useUser", () => ({
    useUser: () => ({
      user: mockUser,
    }),
  }));
  vi.mock("../../composables/useDeck", () => ({
    useDeck: () => ({
      dealToPlayers: mockDealToPlayers,
    }),
  }));

  afterEach(() => {
    mockPlayers.value = [];
    mockActivePlayers.value = [];
    mockUserIsHost.value = false;
    mockHost.value = { uid: "1", username: "The Dude" };
    vi.clearAllMocks();
  });

  it("hides start button for non-host players and shows waiting on players message", () => {
    mockUserIsHost.value = false;
    mockActivePlayers.value = [{ uid: "1" }, { uid: "2" }];
    const wrapper = mount(PreGameDisplay, {
      props: { gameId: "sample_game_id" },
      stubs: { RouterLink: RouterLinkStub },
    });

    const startBtn = wrapper.find("[data-start-button]");
    const msg = wrapper.find("[data-waiting-on-players]");

    expect(startBtn.exists()).toBe(false);
    expect(msg.text()).toBe("WAITING ON MORE PLAYERS...");
  });

  it("hides start button for non-host players and shows waiting on host message with minimum players", () => {
    mockHost.value = { uid: "1", username: "THE DUDE" };
    mockUserIsHost.value = false;
    mockActivePlayers.value = [{ uid: "1" }, { uid: "2" }, { uid: "3" }];
    const wrapper = mount(PreGameDisplay, {
      props: { gameId: "sample_game_id" },
      stubs: { RouterLink: RouterLinkStub },
    });

    const startBtn = wrapper.find("[data-start-button]");
    const msg = wrapper.find("[data-waiting-on-host]");

    expect(startBtn.exists()).toBe(false);
    expect(msg.text()).toBe("WAITING ON THE DUDE TO START THE GAME...");
  });

  it("disables button and shows message if host is waiting on players", async () => {
    mockUserIsHost.value = true;
    const wrapper = mount(PreGameDisplay, {
      props: { gameId: "sample_game_id" },
      stubs: { RouterLink: RouterLinkStub },
    });

    const msg = wrapper.find("[data-waiting-on-players]");
    const btn = wrapper.find("[data-start-button]");
    await btn.trigger("click");

    expect(msg.exists()).toBe(true);
    expect(msg.text()).toBe("WAITING ON MORE PLAYERS...");
    expect(btn.attributes().disabled).toBe("");
    expect(mockStartGameFn).not.toHaveBeenCalled();
  });

  it("enables button for host and calls start game when clicked", async () => {
    mockUserIsHost.value = true;
    mockActivePlayers.value = [{ uid: "1" }, { uid: "2" }, { uid: "3" }];

    const wrapper = mount(PreGameDisplay, {
      props: { gameId: "sample_game_id" },
      stubs: { RouterLink: RouterLinkStub },
    });

    const msg = wrapper.find("[data-waiting-on-players]");
    const btn = wrapper.find("[data-start-button]");
    await btn.trigger("click");

    expect(msg.exists()).toBe(false);
    expect(btn.attributes().disabled).toBeFalsy();
    expect(mockStartGameFn).toHaveBeenCalled();
    expect(mockDealToPlayers).toHaveBeenCalled();
  });
});
