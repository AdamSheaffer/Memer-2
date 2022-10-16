<script lang="ts" setup>
import { Card } from "../../../types";
import { useHand } from "../composables/useHand";
import { useUser } from "../composables/useUser";

const props = defineProps<{ gameId: string; playable?: boolean }>();
const emit = defineEmits<(event: "select", card: Card) => void>();

const { user } = useUser();
const { hand } = useHand(props.gameId, user.value!.uid);

const onClick = (card: Card) => {
  if (props.playable) {
    emit("select", card);
  }
};
</script>

<template>
  <div class="flex -space-x-16 lg:-space-x-8 xl:-space-x-3">
    <div
      v-for="(card, i) in hand"
      class="flex flex-col justify-between bg-darkblue-600 text-slate-200 shadow-2xl w-32 h-40 p-2 border-2 border-purple-400 rounded-lg text-xs cursor-pointer hover:z-[80] hover:text-gold-500 transition-all hover:scale-110 text-center"
      :class="{
        'translate-y-12 lg:translate-y-14': i === 0 || i === 6,
        'translate-y-8': i === 1 || i === 5,
        'translate-y-6': i === 2 || i === 4,
        'translate-y-5': i === 3,
        '-rotate-12': i === 0,
        'rotate-12': i === 6,
        '-rotate-6': i === 1,
        'rotate-6': i === 5,
        '-rotate-3': i === 2,
        'rotate-3': i === 4,
        'z-10': i === 0,
        'z-20': i === 1,
        'z-30': i === 2,
        'z-40': i === 3,
        'z-50': i === 4,
        'z-[60]': i === 5,
        'z-[70]': i === 6,
      }"
      @click="onClick(card)"
    >
      <div>{{ card.top }}</div>
      <div>{{ card.bottom }}</div>
    </div>
  </div>
</template>

<style scoped></style>
