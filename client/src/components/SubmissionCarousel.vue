<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { Meme } from "../../../types";
import MemeDisplay from "./Meme.vue";

const props = defineProps<{ playerSubmissions: Meme[] }>();
const emit = defineEmits<(event: "end") => void>();

const activeIndex = ref(0);

const activeMeme = computed(() => props.playerSubmissions[activeIndex.value]);

onMounted(() => {
  const intervalId = setInterval(() => {
    if (!props.playerSubmissions.length) {
      return;
    }
    if (activeIndex.value === props.playerSubmissions.length) {
      clearInterval(intervalId);
      emit("end");
      return;
    }
    activeIndex.value++;
  }, 5000);
});
</script>

<template>
  <MemeDisplay v-if="activeMeme" :meme="activeMeme"> </MemeDisplay>
</template>
