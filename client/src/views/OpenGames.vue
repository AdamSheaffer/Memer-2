<script setup lang="ts">
import { useRouter } from "vue-router";
import OpenGamesListItem from "../components/OpenGamesListItem.vue";
import { useOpenGames } from "../composeables/useOpenGames";

const { openGames, loading } = useOpenGames();
const router = useRouter();

const goToGameRoom = (gameId: string) => router.push(`/game/${gameId}`);
</script>

<template>
  <div class="h-full w-full relative flex flex-row justify-center items-center px-12">
    <div
      class="h-3/4 w-full lg:w-2/3 xl:w-1/2 mx-auto p-6 rounded-3xl shadow-[1rem_2rem_.8rem_.7rem_rgba(0,0,0,0.3)] bg-darkblue-500"
    >
      <div
        class="h-full rounded-3xl border-4 flex flex-col justify-center border-darkblue-300 bg-darkblue-500"
      >
        <div class="mx-auto flex flex-col space-y-4">
          <OpenGamesListItem
            v-for="game in openGames"
            :key="game.uid"
            :game="game"
            @join="goToGameRoom"
          />
          <div v-if="!loading && !openGames.length">
            There are currently no open games.
            <div>
              <router-link to="/create">Create a new game</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
