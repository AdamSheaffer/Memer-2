<script setup lang="ts">
import { Maybe, SetupOption } from "../../../../types";

const props = defineProps<{
  modelValue: SetupOption<any>["value"];
  options: SetupOption<any>[];
  header: string;
  subheader: Maybe<string>;
}>();

const emit = defineEmits<(event: "update:modelValue", value: SetupOption<any>["value"]) => void>();

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
  </div>
</template>

<style></style>
