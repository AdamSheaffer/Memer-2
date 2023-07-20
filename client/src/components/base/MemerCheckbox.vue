<script lang="ts" setup>
const props = defineProps<{ modelValue: boolean; label?: string }>();
const emit = defineEmits<(event: "update:modelValue", value: boolean) => void>();

const toggle = (event: Event) => {
  const { checked } = event.target as HTMLInputElement;
  emit("update:modelValue", checked);
};
</script>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<template>
  <div class="flex items-center">
    <input
      v-bind="$attrs"
      class="border-gray-300 rounded-xl h-6 w-6 mr-2 cursor-pointer"
      type="checkbox"
      :checked="modelValue"
      @change="toggle"
    />
    <label
      class="inline-block pl-[0.15rem] hover:cursor-pointer font-['Antonio']"
      :for="`${$attrs.id}`"
    >
      {{ props.label }}
    </label>
  </div>
</template>

<style scoped></style>
