import { ref } from "vue";
import { Game } from "../../../../../types";
import { useOpenGames } from "../../../composables/useOpenGames";
import { createFakeGame } from "./fakeGame";

type Mock = ReturnType<typeof useOpenGames>;

export const mockUseOpenGamesValue = (gameCount: number = 0): Mock => {
  const games = Array.from({ length: gameCount }, createFakeGame);

  return {
    openGames: ref<Game[]>(games),
    loading: ref(false),
  };
};
