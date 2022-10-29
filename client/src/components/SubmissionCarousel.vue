<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Meme } from "../../../types";
import { whooshSound } from "../services/sounds";
import MemeDisplay from "./Meme.vue";

const props = defineProps<{ playerSubmissions: Meme[] }>();
const emit = defineEmits<(event: "end") => void>();

const activeIndex = ref(0);

onMounted(() => {
  const intervalId = setInterval(() => {
    if (!props.playerSubmissions.length) {
      return;
    }
    activeIndex.value++;
    if (activeIndex.value === props.playerSubmissions.length) {
      clearInterval(intervalId);
      emit("end");
      return;
    }
    whooshSound.play();
  }, 5000);
});
</script>

<template>
  <div class="flex w-full justify-center relative">
    <TransitionGroup
      enter-active-class="duration-300 transition delay-500 ease-out origin-center"
      enter-from-class="transform opacity-0 scale-0 translate-x-24 rotate-[270deg]"
      enter-to-class="opacity-100 scale-100 translate-x-0 rotate-0"
      leave-active-class="duration-300 ease-in absolute origin-center"
      leave-from-class="opacity-100 scale-100 rotate-0"
      leave-to-class="transform opacity-0 scale-0 rotate-[270deg]"
    >
      <MemeDisplay
        v-for="(submission, i) in playerSubmissions"
        :key="i"
        v-show="i === activeIndex"
        :meme="submission"
      >
      </MemeDisplay>
    </TransitionGroup>
  </div>
</template>
