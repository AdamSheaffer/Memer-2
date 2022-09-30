<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { useGame } from "../composeables/useGame";
import { useUser } from "../composeables/useUser";
import Button from "./base/Button.vue";

const props = defineProps<{ gameId: string }>();
const { activePlayers, startGame, judge } = useGame(props.gameId);
const { user } = useUser();
const hasMinimumPlayers = computed(() => activePlayers.value.length >= 3);
</script>

<template>
  <div>
    <Button data-start-button :disabled="!hasMinimumPlayers" @click="startGame(user!.uid)">
      START GAME
    </Button>
    <div v-if="!hasMinimumPlayers" data-waiting-on-players>Waiting on more players</div>
  </div>
</template>
