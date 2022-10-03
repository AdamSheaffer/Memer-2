<script setup lang="ts">
import { useGame } from "../composeables/useGame";

const props = defineProps<{ gameId: string }>();

const { activePlayers } = useGame(props.gameId);
</script>

<template>
  <aside>
    <ul>
      <li v-for="player in activePlayers" :key="player.uid">
        {{ player.username || `Player ${player.turnIndex}` }}
      </li>
    </ul>
  </aside>
</template>
