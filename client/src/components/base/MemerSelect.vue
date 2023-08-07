<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  modelValue: any;
  label?: string;
  nullOption?: boolean;
  options: any[] | Object;
  displayKey?: string;
  valueKey?: string;
}>();

const emit = defineEmits<(event: "update:modelValue", value: any) => void>();

type SelectOption = { display: string; value: any };

const computedOptions = computed(() => {
  const opts: SelectOption[] = Array.isArray(props.options)
    ? props.options.map((o) => ({ display: o[props.displayKey!], value: o[props.valueKey!] }))
    : Object.entries(props.options).map(([key, val]) => ({ display: val, value: key }));

  return opts;
});

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <label v-if="label" :for="`${$attrs.id}`" class="block mb-2 text-xs font-medium text-gray-300">
    {{ label }}
  </label>
  <select
    v-bind="$attrs"
    :value="modelValue"
    class="appearance-none border-2 outline-0 text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-purple-400 uppercase"
    @change="onChange"
  >
    <option v-if="nullOption" :value="null">---</option>
    <option v-for="option in computedOptions" :key="option.value" :value="option.value">
      {{ option.display }}
    </option>
  </select>
</template>
