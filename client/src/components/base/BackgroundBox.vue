<script lang="ts" setup></script>

<template>
  <div class="h-full w-full flex flex-row justify-center items-center px-2 sm:px-4 md:px-12">
    <div
      class="h-3/4 w-full lg:w-2/3 xl:w-1/2 mx-auto p-6 rounded-3xl shadow-[1rem_2rem_.8rem_.7rem_rgba(0,0,0,0.3)] bg-darkblue-500"
    >
      <div
        class="h-full rounded-3xl border-4 flex flex-col justify-center border-darkblue-300 bg-darkblue-500"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
