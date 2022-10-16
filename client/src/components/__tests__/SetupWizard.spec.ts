import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GameSettings } from "../../../../types";
import SetupWizard from "../GameSetup/SetupWizard.vue";
import ProfileCreate from "../ProfileCreate.vue";

describe("SetupWizard", () => {
  vi.mock("../../composables/useAvatar", () => ({
    useAvatar: () => ({
      markAvatarAsSet: vi.fn(),
      avatar: {},
      photoURL: "fake_photo_url",
    }),
  }));

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should prompt for avatar creation first", () => {
    const wrapper = mount(SetupWizard);

    const avatarCreator = wrapper.findComponent(ProfileCreate);
    expect(avatarCreator.exists()).toBe(true);
  });

  it("should emit with selected game settings", async () => {
    const wrapper = mount(SetupWizard);

    // Avatar
    const saveAvatarBtn = wrapper.findComponent("[data-avatar-save]");
    await saveAvatarBtn.trigger("click");

    // Players
    const stepHeader = wrapper.get("[data-setup-step-header]");
    expect(stepHeader.text()).toContain("PLAYERS");
    await wrapper.get("[data-step-option=7]").trigger("click");
    await wrapper.findComponent("[data-next]").trigger("click");

    // Points
    const pointsHeader = wrapper.get("[data-setup-step-header]");
    expect(pointsHeader.text()).toContain("SCORES");
    await wrapper.get("[data-step-option=3]").trigger("click");
    await wrapper.findComponent("[data-next]").trigger("click");

    // Reverse Rounds
    const reverseHeader = wrapper.get("[data-setup-step-header]");
    expect(reverseHeader.text()).toContain("REVERSE ROUNDS");
    await wrapper.get("[data-step-option=NEVER]").trigger("click");
    await wrapper.findComponent("[data-next]").trigger("click");

    // Timer
    const timerHeader = wrapper.get("[data-setup-step-header]");
    expect(timerHeader.text()).toContain("TIMER");
    await wrapper.get("[data-step-option=60 SEC]").trigger("click");
    await wrapper.findComponent("[data-next]").trigger("click");

    // NSFW
    const nsfwHeader = wrapper.get("[data-setup-step-header]");
    expect(nsfwHeader.text()).toContain("NSFW?");
    await wrapper.get("[data-step-option=KEEP IT PG]").trigger("click");
    await wrapper.findComponent("[data-start]").trigger("click");

    const expectedSettings: GameSettings = {
      maxPlayers: 7,
      pointsToWin: 3,
      reverseRoundFrequency: 0,
      timeLimit: 60,
      safeForWork: true,
    };
    expect(wrapper.emitted("submit")?.[0][0]).toEqual(expectedSettings);
  });
});
