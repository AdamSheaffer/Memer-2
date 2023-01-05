import { vi } from "vitest";

export const mockUseRouterValue = () => {
  return {
    push: vi.fn(),
    replace: vi.fn(),
  };
};
