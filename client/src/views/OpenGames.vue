<script setup lang="ts">
import { onSnapshot, query, where } from "firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Game } from "../../../types";
import { gamesCollectionRef } from "../firebase";
import { joinGame } from "../services/game";
import { useUserStore } from "../store/user";
import { mapCollection } from "../utils/mapCollectionDocs";
import OpenGame from "../components/OpenGame.vue";

const openGames = ref<Game[]>([]);

const q = query(gamesCollectionRef, where("hasStarted", "==", false));
onSnapshot(q, (snapshot) => {
  openGames.value = mapCollection<Game>(snapshot);
});

const userStore = useUserStore();
const router = useRouter();
const join = async (gameId: string) => {
  if (userStore.user) {
    await joinGame(gameId, userStore.user);
    router.push(`/game/${gameId}`);
  }
};
</script>

<template>
  <div>
    <h1>Open Games</h1>
    <ul>
      <OpenGame v-for="game in openGames" :key="game.uid" :game="game" @join="join" />
    </ul>
  </div>
</template>

<style></style>
