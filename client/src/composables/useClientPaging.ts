import { Ref, computed, ref } from "vue";

type PagingOptions<T> = {
  pageSize?: number;
  search?: (q: string | null, items: T) => boolean;
};

export const useClientPaging = <T>(allItems: Ref<T[]>, opt?: PagingOptions<T>) => {
  const _opt: PagingOptions<T> = { pageSize: 20, ...opt };

  const currentPage = ref(1);

  const searchTerm = ref<string | null>(null);

  const filteredItems = computed(() => {
    if (!_opt.search) return allItems.value;

    return allItems.value.filter((item) => _opt.search!(searchTerm.value, item));
  });

  const pageItemsOffset = computed(() => {
    return (currentPage.value - 1) * _opt.pageSize!;
  });

  const isFirstPage = computed(() => {
    return currentPage.value === 1;
  });

  const isLastPage = computed(() => {
    return currentPage.value * _opt.pageSize! >= filteredItems.value.length;
  });

  const pageItems = computed(() => {
    return filteredItems.value.slice(pageItemsOffset.value, _opt.pageSize!);
  });

  const prev = () => {
    if (isFirstPage.value) return;

    currentPage.value--;
  };

  const next = () => {
    if (isLastPage.value) return;

    currentPage.value++;
  };

  return {
    currentPage,
    searchTerm,
    isFirstPage,
    isLastPage,
    pageItems,
    prev,
    next,
  };
};
