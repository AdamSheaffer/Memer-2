<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import { Card, Meme } from "../../../../types";
import { useGame } from "../../composables/useGame";
import { useHand } from "../../composables/useHand";
import { useUser } from "../../composables/useUser";
import GameBoard from "../base/GameBoard.vue";
import Hand from "../Hand.vue";

const props = defineProps<{ gameId: string }>();

const { game, updatePlayer, currentPlayer } = useGame(props.gameId);
const { user } = useUser();
const { removeCard } = useHand(props.gameId, user.value!.uid);

const hasSubmitted = computed(() => !!currentPlayer.value?.memePlayed);

const isSaving = ref(false);
const onSelect = async (card: Card) => {
  isSaving.value = true;

  const memePlayed: Meme = {
    top: card.top,
    bottom: card.bottom,
    photoURL: game.value!.memeTemplate!.photoURL,
  };
  await updatePlayer(user.value!.uid, { memePlayed });
  await removeCard(card.uid!);

  isSaving.value = true;
};

const headerText = computed(() => {
  return hasSubmitted.value ? "AND NOW WE WAIT" : "YOU'RE UP!";
});

const subheaderText = computed(() => {
  return hasSubmitted.value ? "OTHER PLAYERS ARE STILL SUBMITTING" : "PICK A CAPTION FOR YOUR MEME";
});
</script>

<template>
  <GameBoard>
    <div class="flex flex-col items-center justify-between h-full">
      <div class="flex flex-1 items-center">
        <div class="text-center">
          <img
            :src="game!.memeTemplate!.photoURL!"
            :alt="`Meme template photo for ${game!.tagSelection}`"
            class="mx-auto mb-8 block object-cover h-48 w-64 xl:h-52 xl:w-72 2xl:h-72 2xl:w-96 rounded-xl border-4 md:border-8 bg-purple-400 border-purple-400 shadow-xl"
          />
          <h2 class="text-white mb-2 text-shadow-purple text-3xl lg:text-5xl xl:text-7xl">
            {{ headerText }}
          </h2>
          <h4
            class="text-xs lg:text-md xl:text-lg font-['Antonio'] text-gold-400 tracking-widest text-shadow-sm"
          >
            {{ subheaderText }}
          </h4>
        </div>
      </div>
      <Hand :game-id="gameId" :playable="!isSaving && !hasSubmitted" @select="onSelect" />
    </div>
  </GameBoard>
</template>
