<script setup lang="ts">
import MemerLogo from "@/assets/memer_logo.svg";
import { useRouter } from "vue-router";
import BackgroundBox from "../components/base/BackgroundBox.vue";
import OpenGamesListItem from "../components/OpenGamesListItem.vue";
import { useOpenGames } from "../composeables/useOpenGames";
import { faceDizzy } from "../services/icons";

const { openGames, loading } = useOpenGames();
const router = useRouter();

const goToGameRoom = (gameId: string) => router.push(`/game/${gameId}`);
</script>

<template>
  <BackgroundBox>
    <h2 class="text-center text-gold-500 text-shadow-lg text-5xl mb-3">OPEN GAMES</h2>
    <div class="mx-auto flex flex-col space-y-4">
      <OpenGamesListItem
        v-for="game in openGames"
        :key="game.uid"
        :game="game"
        @join="goToGameRoom"
      />
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
              <router-link to="/create" class="text-purple-400 hover:text-purple-300 text-shadow"
                >NEW GAME</router-link
              >
            </h3>
          </div>
        </div>
      </div>
    </div>
    <MemerLogo class="hidden lg:block absolute right-0 bottom-0" />
  </BackgroundBox>
</template>
