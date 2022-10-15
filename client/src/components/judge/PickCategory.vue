<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { useGame } from "../../composables/useGame";
import BackgroundBox from "../base/BackgroundBox.vue";

const props = defineProps<{ gameId: string }>();
const { game, updateGame } = useGame(props.gameId);

const isSaving = ref(false);

const selectCategory = async (category: string) => {
  isSaving.value = true;
  await updateGame({ tagSelection: category });
  isSaving.value = false;
};
</script>

<template>
  <BackgroundBox class="h-3/4">
    <div class="h-full flex flex-col justify-between ml-6">
      <div>
        <h2 class="text-white mt-8 text-shadow-purple text-3xl md:text-7xl">CATEGORY</h2>
        <h4 class="text-xs font-['Antonio'] text-gold-400 tracking-widest text-shadow-sm">
          PICK A CATEGORY FOR YOUR MEME
        </h4>
      </div>
      <div class="flex-1 flex items-center">
        <div class="text-purple-400 flex flex-col space-y-6 md:text-xl">
          <span
            v-for="category in game!.tagOptions"
            :key="category"
            class="cursor-pointer transition-all text-shadow hover:text-2xl hover:text-gold-400"
            @click="selectCategory(category)"
          >
            {{ category }}
          </span>
        </div>
      </div>
    </div>
  </BackgroundBox>
</template>

<style scoped></style>
