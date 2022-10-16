<script lang="ts" setup></script>

<template>
  <div class="w-full h-full board flex items-center justify-center">
    <div
      class="relative w-3/4 h-3/4 rounded-3xl bg-darkblue-500 shadow-[1rem_2rem_.8rem_.7rem_rgba(0,0,0,0.3)]"
    >
      <slot></slot>
    </div>
  </div>
</template>
