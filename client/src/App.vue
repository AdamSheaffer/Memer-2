<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { createGame } from "./services/game";
import { googleLogin, logout } from "./services/user";
import { useUserStore } from "./store/user";

const { user } = storeToRefs(useUserStore());
const router = useRouter();

const onClickOfCreate = async () => {
  const gameId = await createGame({
    hasStarted: false,
    hostId: user.value?.uid,
    hostPhotoURL: user.value?.photoURL ?? null,
    tagOptions: [],
    tagSelection: null,
    gifOptionURLs: [],
    memeTemplate: null,
    memeTemplateTimestamp: null,
    roundType: null,
    roundWinner: null,
    winner: null,
    winningMeme: null,
  });

  router.push(`/game/${gameId}`);
};
</script>

<template>
  <div>
    {{ user?.username }}
    <router-view></router-view>
  </div>
  <button @click="googleLogin" v-if="!user">Sign In</button>
  <button @click="logout" v-else>Sign Out</button>
  <button @click="onClickOfCreate">Create Game</button>
</template>

<style></style>
