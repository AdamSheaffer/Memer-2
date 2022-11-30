<script lang="ts" setup>
import { Maybe } from "../../../../types";

defineProps<{ label?: string; modelValue?: Maybe<string | number> }>();

const emit = defineEmits<(event: "update:modelValue", value: Maybe<string | number>) => void>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<template>
  <div class="w-full font-['Antonio']">
    <label
      v-if="label"
      :for="`${$attrs.id}`"
      class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
    >
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      @input="onInput"
      class="border-2 outline-0 text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-purple-400"
    />
  </div>
</template>
