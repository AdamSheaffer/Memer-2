import { vi } from "vitest";
import { computed, reactive, ref } from "vue";
import { AvatarAttributes, useAvatar } from "../../../composables/useAvatar";

type Mock = ReturnType<typeof useAvatar>;

export const mockUseAvatarValue = (): Mock => {
  const mockAvatar = reactive<AvatarAttributes>({
    name: "JEFF LEBOWSKI",
    eyes: null,
    hair: null,
    body: null,
    mouth: null,
    nose: null,
    facialHair: null,
    hairColor: null,
    skinColor: null,
  });

  const mockPhotoURL = computed(() => "fake_url");
  const mockNeedsAvatarSet = ref(false);
  const mockMarkAvatarAsSet = vi.fn();

  return {
    avatar: mockAvatar,
    photoURL: mockPhotoURL,
    needsAvatarSet: mockNeedsAvatarSet,
    markAvatarAsSet: mockMarkAvatarAsSet,
  };
};
