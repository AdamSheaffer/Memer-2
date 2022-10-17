<script lang="ts" setup>
import { computed, ref } from "vue";
import { useGame } from "../../composables/useGame";
import { arrowLeft, arrowRight } from "../../services/icons";
import GameBoard from "../base/GameBoard.vue";
import Meme from "../Meme.vue";
import SubmissionCarousel from "../SubmissionCarousel.vue";

const props = defineProps<{ gameId: string }>();
const { playerSubmissions, updateGame } = useGame(props.gameId);

const showCarousel = ref(true);

const viewingMemeIndex = ref(0);
const viewingMeme = computed(() => playerSubmissions.value?.[viewingMemeIndex.value]);

const pickMeme = () => {
  return updateGame({ winningMeme: viewingMeme.value });
};
</script>

<template>
  <GameBoard>
    <div class="flex h-full w-full items-center justify-center text-center">
      <div>
        <h2
          v-if="showCarousel"
          class="text-gold-500 text-shadow-purple text-3xl lg:text-5xl xl:text-7xl mb-6"
        >
          SUBMISSIONS
        </h2>
        <SubmissionCarousel
          v-if="showCarousel"
          :player-submissions="playerSubmissions"
          @end="showCarousel = false"
          class="mx-6"
        />
        <div v-if="!showCarousel">
          <h2
            v-if="!showCarousel"
            class="text-slate-200 text-shadow-purple text-3xl lg:text-5xl xl:text-7xl mb-1"
          >
            PICK THE WINNER
          </h2>
          <h4
            class="text-sm md:text-lg font-['Antonio'] text-gold-400 tracking-widest text-shadow-md mb-6"
          >
            WHAT'S YOUR FAVORITE?
          </h4>

          <!-- SELECTOR -->
          <div class="flex items-center flex-col xl:flex-row">
            <div class="hidden xl:block text-center text-gold-400 text-4xl 2xl:text-6xl">
              <button
                :disabled="viewingMemeIndex === 0"
                class="disabled:opacity-50 disabled:cursor-not-allowed"
                @click="viewingMemeIndex--"
              >
                <FaIcon :icon="arrowLeft"></FaIcon>
              </button>
            </div>
            <Meme
              :meme="viewingMeme"
              class="mx-4 hover:scale-105 transition-all cursor-pointer hover:border-gold-500"
              @click="pickMeme"
            />
            <div class="hidden xl:block text-center text-gold-400 text-4xl 2xl:text-6xl">
              <button
                :disabled="viewingMemeIndex === playerSubmissions.length - 1"
                class="disabled:opacity-50 disabled:cursor-not-allowed"
                @click="viewingMemeIndex++"
              >
                <FaIcon :icon="arrowRight"></FaIcon>
              </button>
            </div>
            <div class="xl:hidden flex justify-around w-full mt-10">
              <button
                @click="viewingMemeIndex--"
                :disabled="viewingMemeIndex === 0"
                class="text-gold-400 text-5xl disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <FaIcon :icon="arrowLeft"></FaIcon>
              </button>
              <button
                @click="viewingMemeIndex++"
                :disabled="viewingMemeIndex === playerSubmissions.length - 1"
                class="text-gold-400 text-5xl disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <FaIcon :icon="arrowRight"></FaIcon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </GameBoard>
</template>
