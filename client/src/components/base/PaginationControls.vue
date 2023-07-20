<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  modelValue: number;
  itemCount: number;
  pageSize: number;
}>();

const emits = defineEmits<(event: "update:modelValue", value: number) => void>();

const isFirstPage = computed(() => {
  return props.modelValue === 1;
});

const isLastPage = computed(() => {
  return props.modelValue * props.pageSize! >= props.itemCount;
});

const gotoPage = (page: number) => emits("update:modelValue", page);

const prev = () => {
  if (!isFirstPage.value) {
    gotoPage(props.modelValue - 1);
  }
};

const next = () => {
  if (!isLastPage.value) {
    gotoPage(props.modelValue + 1);
  }
};

const totalPageCount = computed(() => {
  return Math.ceil(props.itemCount / props.pageSize);
});

const pageButtons = computed(() => {
  const maxPagesToShow = 5;
  const halfMaxPages = Math.floor(maxPagesToShow / 2);

  let startPage: number;
  let endPage: number;

  if (totalPageCount.value <= maxPagesToShow) {
    startPage = 1;
    endPage = totalPageCount.value;
  } else if (props.modelValue <= halfMaxPages) {
    startPage = 1;
    endPage = maxPagesToShow;
  } else if (props.modelValue + halfMaxPages >= totalPageCount.value) {
    startPage = totalPageCount.value - maxPagesToShow + 1;
    endPage = totalPageCount.value;
  } else {
    startPage = props.modelValue - halfMaxPages;
    endPage = props.modelValue + halfMaxPages;
  }

  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
});
</script>

<template>
  <ul class="list-style-none flex items-center">
    <li
      class="relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300"
      :class="{
        'cursor-not-allowed text-white text-opacity-25': isFirstPage,
        'cursor-pointer text-white hover:text-purple-100': !isFirstPage,
      }"
      @click="prev"
    >
      PREV
    </li>
    <li
      v-for="pageNumber in pageButtons"
      :key="pageNumber"
      class="relative cursor-pointer block rounded px-3 py-1.5 mx-1 text-sm text-white transition-all duration-300 border-2"
      :class="{
        'bg-transparent hover:border-purple-400': pageNumber !== modelValue,
        'bg-purple-400': pageNumber === modelValue,
      }"
      @click="gotoPage(pageNumber)"
    >
      {{ pageNumber }}
    </li>
    <li
      class="relative block rounded px-3 py-1.5 text-sm transition-all duration-300"
      :class="{
        'cursor-not-allowed text-white text-opacity-25': isLastPage,
        'cursor-pointer text-white hover:text-purple-100': !isLastPage,
      }"
      @click="next"
    >
      NEXT
    </li>
  </ul>
</template>

<style scoped></style>
