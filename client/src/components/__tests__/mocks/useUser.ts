import { vi } from "vitest";
import { ref } from "vue";
import { User } from "../../../../../types";
import { useUser } from "../../../composables/useUser";

type Mock = ReturnType<typeof useUser>;

export const mockUseUserValue = (options?: Partial<User>): Mock => {
  const mockUser = ref<User>({
    uid: "fake_uid",
    username: "JEFF LEBOWSKI",
    photoURL: "fake_url",
    ...options,
  });
  const mockUpdateUser = vi.fn();
  const mockAnonymouslySignInUser = vi.fn();

  return {
    user: mockUser,
    updateUser: mockUpdateUser,
    anonymouslySignInUser: mockAnonymouslySignInUser,
  };
};
