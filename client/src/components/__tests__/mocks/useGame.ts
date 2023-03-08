import { Timestamp } from "firebase/firestore";
import { vi } from "vitest";
import { computed, ref } from "vue";
import { Game, Meme, Player } from "../../../../../types";
import { useGame } from "../../../composables/useGame";
import { getFakePlayers } from "./fakePlayers";

type Mock = ReturnType<typeof useGame>;

export interface MockUseGameValueOptions {
  game?: Partial<Game>;
  players?: Player[];
  activePlayers?: Player[];
  playersCount?: number;
  currentPlayer?: Player;
  everyoneHasSubmitted?: boolean;
  gameWinner?: Player;
  host?: Player;
  isPickingWinner?: boolean;
  isReverseRound?: boolean;
  isSubmissionRound?: boolean;
  isYourTurn?: boolean;
  judge?: Player;
  judgeShouldStartTurn?: boolean;
  judgeIsPickingCategory?: boolean;
  judgeIsPickingGif?: boolean;
  judgeIsPickingReverseRoundCaption?: boolean;
  nextPlayerTurn?: Player;
  playerSubmissions?: Meme[];
  pointsToWin?: number;
  roundWinner?: Player;
  userIsHost?: boolean;
}

export const mockUseGameValue = (options?: MockUseGameValueOptions): Mock => {
  const mockGame = ref<Game>({
    uid: "fake_game_uid",
    beginDate: Timestamp.now(),
    hasStarted: false,
    hostId: "fake_user_id",
    hostPhotoURL: "fake_host_photo_url",
    turn: "fake_user_id",
    tagOptions: null,
    tagSelection: null,
    gifOptionURLs: null,
    memeTemplate: null,
    memeTemplateTimestamp: null,
    roundWinner: null,
    winner: null,
    winningMeme: null,
    round: null,
    maxPlayers: 5,
    pointsToWin: 5,
    safeForWork: false,
    reverseRoundFrequency: 0.5,
    timeLimit: 0,
    lastUpdated: Timestamp.now(),
    ...options?.game,
  });

  const players = options?.players ?? getFakePlayers(options?.playersCount ?? 5);

  return {
    activePlayers: computed(() => options?.activePlayers ?? players),
    clearGame: vi.fn(),
    currentPlayer: computed(() => options?.currentPlayer ?? players[0]),
    everyoneHasSubmitted: computed(() => options?.everyoneHasSubmitted ?? false),
    game: mockGame,
    gameWinner: computed(() => options?.gameWinner ?? null),
    host: computed(() => options?.host ?? players[0]),
    initialize: vi.fn(),
    isPickingWinner: computed(() => options?.isPickingWinner ?? false),
    isReverseRound: computed(() => options?.isReverseRound ?? false),
    isSubmissionRound: computed(() => options?.isSubmissionRound ?? false),
    isYourTurn: computed(() => options?.isYourTurn ?? false),
    judge: computed(() => options?.judge ?? players[0]),
    judgeIsPickingCategory: computed(() => options?.judgeIsPickingCategory ?? false),
    judgeIsPickingGif: computed(() => options?.judgeIsPickingGif ?? false),
    judgeIsPickingReverseRoundCaption: computed(
      () => options?.judgeIsPickingReverseRoundCaption ?? false
    ),
    judgeShouldStartTurn: computed(() => options?.judgeShouldStartTurn ?? false),
    nextPlayerTurn: computed(() => options?.nextPlayerTurn ?? null),
    playerCount: computed(() => options?.playersCount ?? players.length),
    players: ref<Player[]>(players),
    playerSubmissions: computed(() => options?.playerSubmissions ?? []),
    resetGame: vi.fn(),
    resetRound: vi.fn(),
    roundWinner: computed(() => options?.roundWinner ?? null),
    startGame: vi.fn(),
    updateGame: vi.fn(),
    updatePlayer: vi.fn(),
    userIsHost: computed(() => options?.userIsHost ?? false),
  };
};
