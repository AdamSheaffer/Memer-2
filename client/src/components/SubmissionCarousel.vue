<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { Meme } from "../../../types";
import MemeDisplay from "./Meme.vue";

const props = defineProps<{ playerSubmissions: Meme[] }>();
const emit = defineEmits<(event: "end") => void>();

const activeIndex = ref(0);

const activeMeme = computed(() => props.playerSubmissions?.[activeIndex.value]);

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
  }, 5000);
});
</script>

<template>
  <div class="flex w-full justify-center">
    <TransitionGroup
      enter-active-class="duration-300 delay-200"
      enter-from-class="transform opacity-0 translate-x-12 md:translate-x-20 scale-90"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="transform opacity-0 -translate-x-10 md:-translate-x-20 scale-90"
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
