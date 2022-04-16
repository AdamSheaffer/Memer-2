<script setup lang="ts">
import { Maybe, SetupOption } from "../../../../types";

const props = withDefaults(
  defineProps<{
    modelValue: SetupOption<any>["value"];
    options: SetupOption<any>[];
    header: string;
    subheader: Maybe<string>;
    firstStep?: boolean;
    lastStep?: boolean;
  }>(),
  {
    firstStep: false,
    lastStep: false,
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: SetupOption<any>["value"]): void;
  (event: "next"): void;
  (event: "back"): void;
}>();

const onSelectChange = (event: Event) => {
  const el = event.target as HTMLSelectElement;
  emit("update:modelValue", el.value);
};
</script>

<template>
  <div>
    <h1>{{ props.header }}</h1>
    <h4>{{ props.subheader }}</h4>
    <select @change="onSelectChange" :value="modelValue">
      <option v-for="option in options" :key="option.text" :value="option.value">
        {{ option.text }}
      </option>
    </select>
    <button v-if="!props.firstStep" @click="emit('back')">BACK</button>
    <button v-if="!props.lastStep" @click="emit('next')">NEXT</button>
    <button v-if="props.lastStep" @click="emit('next')">START</button>
  </div>
</template>

<style></style>
