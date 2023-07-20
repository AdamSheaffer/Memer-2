<script lang="ts" setup></script>

<template>
  <div class="relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-slate-900 backdrop-blur-lg bg-opacity-25 transition-opacity"></div>

    <div class="fixed inset-0 z-[100] overflow-y-auto">
      <div
        class="flex min-h-full justify-center text-center items-center p-0 animate-fade-in-down-500"
      >
        <div
          class="relative transform overflow-hidden rounded-3xl bg-darkblue-500 text-left shadow-xl transition-all my-8 w-full max-w-lg"
        >
          <div
            class="p-6 rounded-3xl shadow-[1rem_2rem_.8rem_.7rem_rgba(0,0,0,0.3)] bg-darkblue-500"
          >
            <div
              class="h-full rounded-3xl border-4 flex flex-col justify-center border-darkblue-300 bg-darkblue-500"
            >
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
