<script lang="ts" setup>
import { Maybe, Meme } from "../../../types";

defineProps<{ meme: Meme }>();

const fontSizeClass = (text: Maybe<string>) => {
  if (!text?.length) {
    return;
  }

  if (text.length > 25) {
    return "text-sm md:text-lg lg:text-xl";
  }

  if (text.length > 15) {
    return "md:text-xl lg:text-2xl";
  }

  return "md:text-2xl lg:text-3xl";
};
</script>

<template>
  <div
    class="flex justify-center items-center shadow-sm shadow-slate-500 border-2 border-purple-400 rounded-xl w-72"
  >
    <div>
      <div
        class="flex items-center justify-center rounded-t-xl bg-darkblue-600 text-slate-200 px-2 py-4 min-h-min h-16"
      >
        <h2 class="text-shadow-purple" :class="fontSizeClass(meme.top)">
          {{ meme.top }}
        </h2>
      </div>
      <img
        :src="meme.photoURL!"
        :alt="`${meme.bottom} ${meme.top}`"
        class="object-cover w-full h-64"
      />
      <div
        class="flex items-center justify-center rounded-b-xl bg-darkblue-600 text-slate-200 px-2 py-4 min-h-min h-16"
      >
        <h2 class="text-shadow-purple" :class="fontSizeClass(meme.bottom)">
          {{ meme.bottom }}
        </h2>
      </div>
    </div>
  </div>
</template>
