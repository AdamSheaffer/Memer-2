import { vi } from "vitest";
import { ref } from "vue";
import { Maybe, Profile, User } from "../../../../../types";
import { useUser } from "../../../composables/useUser";

type Mock = ReturnType<typeof useUser>;

export const mockUseUserValue = (options?: Partial<User>): Mock => {
  const mockUser = ref<User>({
    uid: "fake_uid",
    username: "JEFF LEBOWSKI",
    photoURL: "fake_url",
    ...options,
  });

  const mockProfile = ref<Maybe<Profile>>(null);

  return {
    user: mockUser,
    profile: mockProfile,
    updateUser: vi.fn(),
    initializeUser: vi.fn(),
    signInWithGoogle: vi.fn(),
    switchToAnonymousUser: vi.fn(),
  };
};
