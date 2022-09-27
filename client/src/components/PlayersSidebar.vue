<script setup lang="ts">
import { useGame } from "../composeables/useGame";

const props = defineProps<{ gameId: string }>();

const { activePlayers } = useGame(props.gameId);
</script>

<template>
  <aside>
    PLAYERS SIDEBAR
    <ul>
      <li v-for="player in activePlayers" :key="player.uid">{{ player.uid }}</li>
    </ul>
  </aside>
</template>
