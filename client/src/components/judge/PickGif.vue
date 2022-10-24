<script lang="ts" setup>
import { Timestamp } from "@firebase/firestore";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useGame } from "../../composables/useGame";
import { arrowLeft, arrowRight } from "../../services/icons";
import BackgroundBox from "../base/BackgroundBox.vue";

const props = defineProps<{ gameId: string }>();

const { updateGame, game } = useGame(props.gameId);

const API_KEY = import.meta.env.VITE_GIPHY_KEY as string;
const giphyClient = new GiphyFetch(API_KEY);
const isLoading = ref(false);
const isSaving = ref(false);

const getGifs = async (category: string, count = 8): Promise<string[]> => {
  isLoading.value = true;
  const resp = await giphyClient.search(category, {
    limit: count,
    offset: Math.floor(Math.random() * 50),
  });
  isLoading.value = false;

  return resp.data.map((g) => g.images.fixed_height.url);
};

onMounted(async () => {
  if (!game.value?.tagSelection) {
    throw Error("No category was selected");
  }

  // Don't fetch gifs if the game already has them set
  if (game.value?.gifOptionURLs?.length) {
    return;
  }

  isLoading.value = true;
  const gifs = await getGifs(game.value.tagSelection);
  await updateGame({ gifOptionURLs: gifs });
  isLoading.value = false;
});

const gifIndex = ref(0);
const currentGif = computed(() => game.value?.gifOptionURLs?.[gifIndex.value]);
const isFirstGif = computed(() => gifIndex.value === 0);
const isLastGif = computed(() => gifIndex.value + 1 === game.value?.gifOptionURLs?.length);

const selectGif = () => {
  isSaving.value = true;
  return updateGame({
    memeTemplate: {
      top: null,
      bottom: null,
      photoURL: currentGif.value,
    },
    memeTemplateTimestamp: Timestamp.now(),
  });
};
</script>

<template>
  <BackgroundBox>
    <div class="h-full flex flex-col justify-between mx-6">
      <div>
        <h2 class="text-white mt-8 text-shadow-purple text-3xl lg:text-5xl xl:text-7xl">
          CHOOSE GIF
        </h2>
        <h4
          class="text-xs lg:text-md xl:text-lg font-['Antonio'] text-gold-400 tracking-widest text-shadow-sm"
        >
          EVERY MEME'S GOTTA START SOMEWHERE
        </h4>
      </div>
      <div v-if="!isLoading" class="flex-1 flex items-center justify-center">
        <div class="flex flex-col xl:flex-row justify-between items-center">
          <div class="hidden xl:block text-center text-gold-400 text-4xl 2xl:text-6xl">
            <button
              @click="gifIndex--"
              :disabled="isFirstGif"
              class="disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <FaIcon :icon="arrowLeft"></FaIcon>
            </button>
          </div>
          <img
            v-for="gifURL in game!.gifOptionURLs"
            v-show="gifURL === currentGif"
            :key="gifURL"
            :src="gifURL"
            :alt="`${game!.tagSelection} Option ${gifIndex + 1}`"
            class="object-cover h-48 w-64 xl:h-52 xl:w-72 2xl:h-72 2xl:w-96 rounded-xl md:mx-4 2xl:mx-8 border-4 border-gold-400 hover:border-purple-400 cursor-pointer hover:scale-105 transition-all"
            @click="selectGif"
          />
          <div class="hidden xl:block text-center text-gold-400 text-4xl 2xl:text-6xl">
            <button
              @click="gifIndex++"
              :disabled="isLastGif"
              class="disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <FaIcon :icon="arrowRight"></FaIcon>
            </button>
          </div>
          <div class="xl:hidden flex justify-around w-full mt-10">
            <button
              @click="gifIndex--"
              :disabled="isFirstGif"
              class="text-gold-400 text-5xl disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <FaIcon :icon="arrowLeft"></FaIcon>
            </button>
            <button
              @click="gifIndex++"
              :disabled="isLastGif"
              class="text-gold-400 text-5xl disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <FaIcon :icon="arrowRight"></FaIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </BackgroundBox>
</template>
