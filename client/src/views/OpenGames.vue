<script setup lang="ts">
import { onSnapshot, query, where } from "firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Game } from "../../../types";
import { gamesCollectionRef } from "../firebase";
import { useGameStore } from "../store/game";
import { useUserStore } from "../store/user";
import { mapCollection } from "../utils/mapCollectionDocs";
import OpenGame from "../components/OpenGame.vue";

const openGames = ref<Game[]>([]);

const q = query(gamesCollectionRef, where("hasStarted", "==", false));
onSnapshot(q, (snapshot) => {
  openGames.value = mapCollection<Game>(snapshot);
});

const { user } = useUserStore();
const { joinGame } = useGameStore();

const router = useRouter();
const join = async (gameId: string) => {
  if (user) {
    await joinGame(gameId, user);
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
