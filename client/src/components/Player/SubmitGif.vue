<script lang="ts" setup>
import { renderCarousel } from "@giphy/js-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { IGif } from "@giphy/js-types";
import { watchDebounced } from "@vueuse/shared";
import { computed, ref } from "vue";
import { Maybe, Meme } from "../../../../types";
import { useGame } from "../../composables/useGame";
import { useUser } from "../../composables/useUser";
import { affirmativeSound } from "../../services/sounds";
import GameBoard from "../base/GameBoard.vue";
import MemerInput from "../base/MemerInput.vue";
import MemeDisplay from "../Meme.vue";

const props = defineProps<{ gameId: string }>();

const { currentPlayer, game, updatePlayer } = useGame(props.gameId);
const { user } = useUser();

const API_KEY = import.meta.env.VITE_GIPHY_KEY as string;
const giphyClient = new GiphyFetch(API_KEY);
const carouselTarget = ref<Maybe<HTMLElement>>(null);

const searchTerm = ref("");
const results = ref<IGif[]>([]);

const fetchGifs = async (offset: number) => {
  const response = await giphyClient.search(searchTerm.value, { offset, limit: 4 });
  results.value = response.data;
  return response;
};

let removeCallBack: any;

const renderNewGifs = () => {
  if (removeCallBack) {
    removeCallBack();
  }
  removeCallBack = renderCarousel(
    {
      gifHeight: 150,
      user: {},
      fetchGifs,
      gutter: 10,
      noLink: true,
      hideAttribution: true,
      onGifClick: onSelect,
    },
    carouselTarget.value!
  );
};

watchDebounced(searchTerm, renderNewGifs, { debounce: 400 });

const isSaving = ref(false);

const onSelect = async (gif: IGif) => {
  if (!game?.value?.memeTemplate) {
    throw Error("Tried to select GIF but there is no meme template");
  }

  affirmativeSound.play();

  isSaving.value = true;

  const memePlayed: Meme = {
    ...game.value.memeTemplate,
    photoURL: gif.images.fixed_height.url,
  };
  await updatePlayer(user.value!.uid, { memePlayed });

  isSaving.value = true;
};

const hasSubmitted = computed(() => !!currentPlayer.value?.memePlayed);

const headerText = computed(() => (hasSubmitted.value ? "AND NOW WE WAIT" : "YOU'RE UP!"));
const subheaderText = computed(() =>
  hasSubmitted.value ? "OTHER PLAYERS ARE STILL SUBMITTING" : "FIND A GIF TO GO WITH THIS CAPTION"
);
</script>

<template>
  <GameBoard>
    <div class="flex flex-col items-center justify-between h-full">
      <div class="flex flex-1 items-center justify-center">
        <div class="text-center">
          <h2 class="text-white mb-2 text-shadow-purple text-4xl lg:text-6xl xl:text-8xl">
            {{ headerText }}
          </h2>
          <h4
            class="text-xs lg:text-md xl:text-lg font-['Antonio'] text-gold-400 tracking-widest text-shadow-sm mb-6"
          >
            {{ subheaderText }}
          </h4>
          <div v-if="!hasSubmitted" class="flex flex-col justify-center items-center">
            <MemeDisplay
              :meme="game!.memeTemplate!"
              class="mb-10 shadow-lg shadow-slate-900"
            ></MemeDisplay>
            <div class="mb-5 w-full lg:w-96 flex justify-center">
              <MemerInput
                autofocus
                v-model="searchTerm"
                placeholder="SEARCH GIFS..."
                class="text-xl p-3 uppercase"
              />
            </div>
            <div class="overflow-hidden h-[200px] max-w-[20rem] lg:max-w[40rem] xl:max-w-[50rem]">
              <div ref="carouselTarget"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </GameBoard>
</template>

<style scoped>
:deep(.giphy-gif-img) {
  border-radius: 0.5rem;
  cursor: pointer;
  box-sizing: border-box;
}

:deep(.giphy-gif-img:hover) {
  border: 3px solid #f2cd1c;
  transform: scale(0.96);
}
</style>
