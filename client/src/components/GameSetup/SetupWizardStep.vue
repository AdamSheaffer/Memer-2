<script setup lang="ts">
import { Maybe, SetupOption } from "../../../../types";
import MemerButton from "../base/MemerButton.vue";

const props = withDefaults(
  defineProps<{
    modelValue: SetupOption<any>["value"];
    options: SetupOption<any>[];
    header: string;
    subheader: Maybe<string>;
    firstStep?: boolean;
    lastStep?: boolean;
    smallText?: boolean;
    smallCol?: boolean;
  }>(),
  {
    firstStep: false,
    lastStep: false,
    smallText: false,
    smallCol: false,
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: SetupOption<any>["value"]): void;
  (event: "next"): void;
  (event: "back"): void;
}>();

const onSelectChange = (val: typeof props.modelValue) => {
  emit("update:modelValue", val);
};
</script>

<template>
  <div class="p-4 h-full flex flex-col justify-between">
    <div data-setup-step-header>
      <h2 class="text-white text-6xl text-shadow-purple">{{ props.header }}</h2>
      <h4 class="font-['Antonio'] text-lg text-gold-400 mt-2 tracking-widest">
        {{ props.subheader }}
      </h4>
    </div>
    <div
      class="flex justify-around"
      :class="{
        'flex-col md:flex-row items-center': smallCol,
      }"
    >
      <h4
        v-for="option in options"
        :key="option.value"
        class="transition-all h-16 cursor-pointer"
        :class="{
          'text-gold-400 text-shadow-purple -mt-1': option.value === modelValue,
          'text-2xl md:text-4xl': option.value === modelValue && smallText,
          'text-4xl md:text-7xl': option.value === modelValue && !smallText,
          'text-purple-400 text-shadow': option.value !== modelValue,
          'text-lg md:text-3xl': option.value !== modelValue && smallText,
          'text-2xl md:text-5xl': option.value !== modelValue && !smallText,
        }"
        :data-step-option="option.text"
        @click="onSelectChange(option.value)"
      >
        {{ option.text }}
      </h4>
    </div>
    <div class="flex justify-between space-x-4 px-2">
      <MemerButton
        v-if="!props.firstStep"
        outline
        color="teal"
        class="w-full md:w-24 tracking-wider"
        data-back
        sound="affirmative"
        @click="emit('back')"
      >
        BACK
      </MemerButton>
      <MemerButton
        v-if="!props.lastStep"
        color="teal"
        class="w-full ml-auto md:w-24 tracking-wider"
        data-next
        sound="affirmative"
        @click="emit('next')"
      >
        NEXT
      </MemerButton>
      <MemerButton
        v-if="props.lastStep"
        color="teal"
        class="w-full ml-auto md:w-24 tracking-wider"
        data-start
        sound="affirmative"
        @click="emit('next')"
      >
        START
      </MemerButton>
    </div>
  </div>
</template>
