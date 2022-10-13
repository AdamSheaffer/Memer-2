import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { Player } from "../../../../types";
import StartButton from "../PreGameDisplay.vue";

const mockStartGameFn = vi.fn();
const mockActivePlayers = ref<Partial<Player>[]>([]);

describe("StartButton", () => {
  vi.mock("../../composeables/useGame", () => ({
    useGame: () => ({
      activePlayers: mockActivePlayers,
      startGame: mockStartGameFn,
    }),
  }));

  afterEach(() => {
    mockActivePlayers.value = [];
    vi.clearAllMocks();
  });

  it("disables button and shows message if waiting on players", async () => {
    const wrapper = mount(StartButton, {
      props: { gameId: `sample_game_id` },
    });

    const msg = wrapper.find("[data-waiting-on-players]");
    const btn = wrapper.find("button");
    await btn.trigger("click");

    expect(msg.exists()).toBe(true);
    expect(msg.text()).toBe("Waiting on more players");
    expect(btn.attributes().disabled).toBe("true");
    expect(mockStartGameFn).not.toHaveBeenCalled();
  });

  it("enables button and calls start game when clicked", async () => {
    mockActivePlayers.value = [{ uid: "1" }, { uid: "2" }, { uid: "3" }];
    const wrapper = mount(StartButton, {
      props: { gameId: `sample_game_id` },
    });

    const msg = wrapper.find("[data-waiting-on-players]");
    const btn = wrapper.find("[data-start-button]");
    await btn.trigger("click");

    expect(msg.exists()).toBe(false);
    expect(btn.attributes().disabled).toBe("false");
  });
});
