<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  block?: boolean;
  color?: string;
  outline?: boolean;
  rounded?: boolean;
  size?: "sm" | "md" | "lg";
  type?: "primary" | "secondary";
}>();

const colorClasses = computed(() => {
  const color = props.color || props.type || "primary";
  const classes = props.outline
    ? [
        `bg-${color}-100`,
        `hover:bg-${color}-200`,
        `border-${color}-400}`,
        `hover:border-${color}-500}`,
        `text-${color}-400`,
        `hover:text-${color}-500`,
      ]
    : [`bg-${color}-400`, `hover:bg-${color}-300`, `text-white`, `hover:text-${color}-200`];

  return classes;
});
</script>

<template>
  <button
    class="mx-2 my-2 bg-purple-400 transition duration-150 ease-in-out rounded text-white px-8 py-3 text-sm"
  >
    <slot />
  </button>
</template>

<style></style>
