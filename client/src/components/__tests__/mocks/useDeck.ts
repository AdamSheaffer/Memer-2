import { vi } from "vitest";
import { ref } from "vue";
import { Card } from "../../../../../types";
import { useDeck } from "../../../composables/useDeck";
import { CARDS } from "./fakeCards";

type Mock = ReturnType<typeof useDeck>;

export const mockUseDeckValue = (): Mock => {
  return {
    dealToPlayers: vi.fn(),
    deck: ref<Card[]>([...CARDS]),
    load: vi.fn(),
    loading: ref(false),
  };
};
