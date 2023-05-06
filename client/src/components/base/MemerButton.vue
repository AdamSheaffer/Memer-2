<script setup lang="ts">
import { computed } from "vue";
import { RouteLocationRaw, RouterLink } from "vue-router";
import { Maybe } from "../../../../types";
import { affirmativeSound, negativeSound } from "../../services/sounds";

const props = withDefaults(
  defineProps<{
    color?: "purple" | "teal" | "gold" | "darkblue" | "red";
    outline?: boolean;
    to?: Maybe<RouteLocationRaw>;
    round?: boolean;
    sound?: Maybe<"affirmative" | "negative">;
  }>(),
  {
    color: "purple",
    outline: false,
    round: false,
    to: null,
    sound: null,
  }
);

const emit = defineEmits<{
  (event: "click"): void;
}>();

const clickHandler = () => {
  switch (props.sound) {
    case "affirmative":
      affirmativeSound.play();
      break;
    case "negative":
      negativeSound.play();
      break;
    default:
      break;
  }

  emit("click");
};

const staticClasses = `text-center border-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition duration-150 ease-in-out py-2 px-4`;
const dynamicClasses = computed(() => {
  const roundedClasses = props.round ? "rounded-full" : "rounded-lg";
  const outlineClasses = props.outline
    ? `bg-transparent text-${props.color}-500 hover:text-${props.color}-400 border-${props.color}-500 hover:border-${props.color}-400 disabled:hover:border-${props.color}-500`
    : `bg-${props.color}-400 hover:bg-${props.color}-300 text-white border-${props.color}-500 disabled:hover:bg-${props.color}-400`;

  return [roundedClasses, outlineClasses];
});
</script>

<template>
  <router-link v-if="to" :to="to" :class="[staticClasses, ...dynamicClasses]" @click="clickHandler">
    <slot></slot>
  </router-link>

  <button v-else :class="[staticClasses, ...dynamicClasses]" @click="clickHandler">
    <slot></slot>
  </button>
</template>
