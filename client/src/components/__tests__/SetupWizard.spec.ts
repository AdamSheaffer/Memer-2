import { mount, RouterLinkStub } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { GameSettings } from "../../../../types";
import { useAvatar } from "../../composables/useAvatar";
import { useUser } from "../../composables/useUser";
import SetupWizard from "../GameSetup/SetupWizard.vue";
import ProfileCreate from "../ProfileCreate.vue";
import { mockUseAvatarValue } from "./mocks/useAvatar";
import { mockUseUserValue } from "./mocks/useUser";

vi.mock("../../composables/useUser");
vi.mock("../../composables/useAvatar");

const useUserMock = useUser as Mock;
const useAvatarMock = useAvatar as Mock;

beforeEach(() => {
  useUserMock.mockImplementation(mockUseUserValue);
  useAvatarMock.mockImplementation(mockUseAvatarValue);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("SetupWizard", () => {
  it("should prompt for avatar creation first", () => {
    const wrapper = mount(SetupWizard, {
      global: {
        stubs: { RouterLink: RouterLinkStub, FaIcon: { template: "<div></div>" } },
      },
    });

    const avatarCreator = wrapper.findComponent(ProfileCreate);
    expect(avatarCreator.exists()).toBe(true);
  });

  it("should emit with selected game settings", async () => {
    const wrapper = mount(SetupWizard, {
      global: {
        stubs: { RouterLink: RouterLinkStub, FaIcon: { template: "<div></div>" } },
      },
    });

    // Avatar
    const avatarForm = wrapper.get("form");
    await avatarForm.trigger("submit");

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

    // NSFW
    const nsfwHeader = wrapper.get("[data-setup-step-header]");
    expect(nsfwHeader.text()).toContain("NSFW?");
    await wrapper.get("[data-step-option=KEEP IT PG]").trigger("click");
    await wrapper.findComponent("[data-start]").trigger("click");

    const expectedSettings: GameSettings = {
      maxPlayers: 7,
      pointsToWin: 3,
      reverseRoundFrequency: 0,
      timeLimit: 0,
      safeForWork: true,
    };
    expect(wrapper.emitted("submit")?.[0][0]).toEqual(expectedSettings);
  });
});
