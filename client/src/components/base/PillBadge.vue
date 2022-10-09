<script lang="ts" setup>
const props = defineProps<{
  color: "purple" | "red" | "gold" | "teal";
  icon: string;
}>();
</script>

<template>
  <div class="flex group relative text-xs">
    <div
      class="px-3 py-0.5 text-white rounded-l-md"
      :class="{
        'bg-purple-400': color === 'purple',
        'bg-red-500': color === 'red',
        'bg-gold-500': color === 'gold',
        'bg-teal-400': color === 'teal',
      }"
    >
      <FaIcon :icon="icon"></FaIcon>
    </div>
    <div
      class="px-3 py-0.5 bg-white rounded-r-md"
      :class="{
        'text-purple-400': color === 'purple',
        'text-red-500': color === 'red',
        'text-gold-500': color === 'gold',
        'text-teal-400': color === 'teal',
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>
