<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGame } from "../composeables/useGame";
import { useUser } from "../composeables/useUser";
import { joinGame } from "../services/gameService";

const { user } = useUser();
const { params } = useRoute();
const { game, trackChanges, players } = useGame(params.id as string);

onMounted(() => {
  joinGame(params.id as string, user.value!);
  trackChanges();
});
</script>

<template>
  <div>
    GAMEROOM
    <p>Started: {{ game?.hasStarted }}</p>
    <pre>{{ players }}</pre>
  </div>
</template>

<style></style>
