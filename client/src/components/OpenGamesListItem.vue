<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core";
import { Game } from "../../../types";
import { briefcase, heart, users } from "../services/icons";
import PillBadge from "./base/PillBadge.vue";

const props = defineProps<{ game: Game }>();
defineEmits<(event: "join", gameId: string) => void>();

const timeAgoStarted = useTimeAgo(props.game.beginDate?.toDate() ?? new Date());
</script>

<template>
  <div
    class="flex flex-col md:flex-row items-end md:space-x-12 space-y-4 md:space-y-0 border-2 border-purple-400 py-2 px-4 rounded-lg"
  >
    <img
      v-if="game.hostPhotoURL"
      :src="game.hostPhotoURL"
      class="hidden md:block rounded-full w-14 h-14 mx-auto border-2 border-gold-500 bg-teal-500"
    />
    <div class="ml-0">
      <div class="flex flex-col">
        <div class="text-white text-xs md:text-sm tracking-wide mb-2">
          Created {{ timeAgoStarted }}
        </div>
        <div class="flex flex-wrap justify-start space-x-2">
          <PillBadge
            class="mt-1"
            color="purple"
            :icon="heart"
            :title="`${game.pointsToWin} points to win`"
          >
            {{ game.pointsToWin }}
          </PillBadge>
          <PillBadge
            class="mt-1"
            color="purple"
            :icon="users"
            :title="`${game.maxPlayers} max players`"
          >
            {{ game.maxPlayers }}
          </PillBadge>
          <PillBadge
            class="mt-1"
            color="red"
            :icon="briefcase"
            :title="`${!game.safeForWork && 'Not '}Safe for Work`"
          >
            {{ game.safeForWork ? "SFW" : "NSFW" }}
          </PillBadge>
        </div>
      </div>
    </div>
    <button
      class="text-white w-full md:w-24 bg-teal-500 hover:bg-teal-400 border-teal-600 border-2 px-4 py-2 rounded-md tracking-wider"
      @click="$emit('join', game.uid!)"
    >
      JOIN
    </button>
  </div>
</template>

<style></style>
