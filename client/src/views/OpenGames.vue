<script setup lang="ts">
import MemerLogo from "@/assets/memer_logo.svg?component";
import { useRouter } from "vue-router";
import OpenGamesListItem from "../components/OpenGamesListItem.vue";
import BackgroundBox from "../components/base/BackgroundBox.vue";
import { useOpenGames } from "../composables/useOpenGames";
import { faceDizzy } from "../services/icons";

const { openGames, loading } = useOpenGames();
const router = useRouter();

const goToGameRoom = (gameId: string) => router.push(`/game/${gameId}`);
</script>

<template>
  <BackgroundBox>
    <h2 class="text-center text-gold-500 text-shadow text-5xl my-3">OPEN GAMES</h2>
    <h4 v-if="openGames.length" class="text-center text-white text-sm">
      HOST A
      <router-link
        to="/create"
        class="text-teal-500 hover:text-teal-200 text-shadow"
        data-host-game-link
      >
        NEW GAME
      </router-link>
    </h4>
    <div class="mx-auto my-3 overflow-y-auto px-1 scrollbar">
      <div v-if="openGames.length" class="flex flex-col space-y-4">
        <OpenGamesListItem
          v-for="game in openGames"
          :key="game.uid"
          :game="game"
          @join="goToGameRoom"
        />
      </div>
      <div v-if="!loading && !openGames.length">
        <div
          class="flex flex-col md:flex-row items-center md:space-x-6 border-2 border-purple-400 py-2 px-4 mt-4 rounded-lg"
        >
          <div>
            <FaIcon class="text-purple-400 text-5xl" :icon="faceDizzy"></FaIcon>
          </div>
          <div class="text-center md:text-left mt-2 md:mt-0">
            <h3 class="text-lg text-white">Welp... There aren't any open games right now</h3>
            <h3 class="text-lg text-white mt-1">
              Try hosting a
              <router-link
                to="/create"
                class="text-purple-400 hover:text-purple-300 text-shadow"
                data-host-game-link
              >
                NEW GAME
              </router-link>
            </h3>
          </div>
        </div>
      </div>
    </div>
    <MemerLogo class="hidden lg:block absolute right-0 bottom-0" />
  </BackgroundBox>
</template>
