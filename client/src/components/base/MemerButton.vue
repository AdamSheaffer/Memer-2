<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { RouteLocationRaw } from "vue-router";

const props = withDefaults(
  defineProps<{
    color?: "purple" | "teal" | "gold" | "darkblue" | "red";
    outline?: boolean;
    to?: RouteLocationRaw;
  }>(),
  {
    color: "purple",
    outline: false,
  }
);

const staticClasses = `text-center border-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition duration-150 ease-in-out py-2 px-4 rounded-lg`;
const dynamicClasses = computed(() => {
  return props.outline
    ? `bg-transparent text-${props.color}-500 hover:text-${props.color}-400 border-${props.color}-500 hover:border-${props.color}-400 disabled:hover:border-${props.color}-500`
    : `bg-${props.color}-400 hover:bg-${props.color}-300 text-white border-${props.color}-500 disabled:hover:bg-${props.color}-400`;
});
</script>

<template>
  <router-link v-if="to" :to="to" :class="[staticClasses, dynamicClasses]">
    <slot></slot>
  </router-link>

  <button
    v-else
    class="border-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition duration-150 ease-in-out py-2 px-4 rounded-lg"
    :class="[staticClasses, dynamicClasses]"
  >
    <slot></slot>
  </button>
</template>
