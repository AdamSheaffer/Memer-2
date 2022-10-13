<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { Maybe } from "../../../../types";
import { useGame } from "../../composables/useGame";
import BackgroundBox from "../base/BackgroundBox.vue";

const props = defineProps<{ gameId: string }>();
const { game, updateGame } = useGame(props.gameId);

const selection = ref<Maybe<string>>(null);
const isSaving = ref(false);

const selectCategory = async () => {
  isSaving.value = true;
  await updateGame({ tagSelection: selection.value });
  isSaving.value = false;
};
</script>

<template>
  <BackgroundBox class="h-3/4">
    <div class="h-full flex flex-col justify-between ml-6">
      <div>
        <h2 class="text-white mt-8 text-shadow-purple text-7xl">CATEGORY</h2>
        <h4 class="text-lg font-['Antonio'] text-gold-400 tracking-widest text-shadow-sm">
          PICK A CATEGORY FOR YOUR MEME
        </h4>
      </div>
      <ul class="text-purple-400 flex flex-col space-y-4 text-xl">
        <li
          v-for="category in game!.tagOptions"
          :key="category"
          class="cursor-pointer transition-all text-shadow"
          :class="{ 'text-4xl text-gold-400 text-shadow-purple': category === selection }"
          @click="selection = category"
        >
          {{ category }}
        </li>
      </ul>
      <div class="flex px-6 mb-4">
        <button
          :disabled="!selection"
          class="text-white w-full ml-auto md:w-24 bg-teal-500 hover:bg-teal-400 border-teal-600 border-2 px-4 py-2 rounded-md tracking-wider disabled:opacity-50 disabled:hover:bg-teal-500 disabled:cursor-not-allowed"
          @click="selectCategory"
        >
          NEXT
        </button>
      </div>
    </div>
  </BackgroundBox>
</template>

<style scoped></style>
