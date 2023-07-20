<script lang="ts" setup>
import { Unsubscribe, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { Card, Maybe } from "../../../../types";
import CardForm from "../../components/Admin/CardForm.vue";
import MemerInput from "../../components/base/MemerInput.vue";
import PaginationControls from "../../components/base/PaginationControls.vue";
import { captionsCollectionRef } from "../../firebase";
import { check, trash } from "../../services/icons";
import { format } from "../../utils/dates";
import { mapCollection } from "../../utils/mapCollectionDocs";

const cards = ref<Card[]>([]);
const cardsUnsubscribe = ref<Maybe<Unsubscribe>>(null);
const searchTerm = ref("");
const filteredItems = computed(() =>
  cards.value.filter((c) =>
    `${c.top.toLowerCase()} ${c.bottom.toLowerCase()}`.includes(searchTerm.value.toLowerCase())
  )
);
const pageSize = 10;
const currentPage = ref(1);

const pageItems = computed(() => {
  const offset = (currentPage.value - 1) * pageSize;
  return filteredItems.value.slice(offset, offset + pageSize);
});

watch(searchTerm, () => {
  if (currentPage.value !== 1) {
    currentPage.value = 1;
  }
});

const watchCards = () => {
  const q = query(captionsCollectionRef, orderBy("createdAt", "desc"));
  cardsUnsubscribe.value = onSnapshot(q, (snapshot) => {
    cards.value = mapCollection<Card>(snapshot);
  });
};

const deleteCard = (card: Card) => {
  const cardRef = doc(captionsCollectionRef, card.uid);
  return deleteDoc(cardRef);
};

onMounted(watchCards);

onUnmounted(() => {
  if (cardsUnsubscribe.value) cardsUnsubscribe.value();
});
</script>

<template>
  <div class="flex justify-center w-full overflow-auto py-4">
    <div class="w-full md:w-3/4 2xl:w-1/2 px-10 md:px-0">
      <h1 class="text-white text-6xl text-shadow-purple mt-4 text-center md:text-left">CARDS</h1>
      <h3
        class="font-['Antonio'] text-lg text-slate-200 mt-2 tracking-widest mb-8 text-center md:text-left"
      >
        MANAGE CAPTION CARDS
      </h3>

      <CardForm class="mb-24" />

      <MemerInput
        v-model="searchTerm"
        placeholder="SEARCH"
        class="mb-4 w-full md:w-1/2 uppercase h-14"
      />

      <div class="w-full">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400 font-['Antonio'] shadow-lg shadow-purple-700"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Top</th>
              <th scope="col" class="px-6 py-3">Bottom</th>
              <th scope="col" class="px-6 py-3">SFW</th>
              <th scope="col" class="px-6 py-3">Created Date</th>
              <th scope="col" class="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="card in pageItems"
              :key="card.uid"
              class="bg-white border-b dark:bg-slate-800 dark:border-gray-700"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white"
              >
                {{ card.top }}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white"
              >
                {{ card.bottom }}
              </th>
              <td class="px-6 py-4">
                <FaIcon v-if="card.safeForWork" :icon="check" class="text-xl text-purple-400" />
              </td>
              <td class="px-6 py-4 tracking-wider">{{ format(card.createdAt?.toDate()) }}</td>
              <td>
                <FaIcon
                  :icon="trash"
                  title="DELETE"
                  class="cursor-pointer text-xl text-red-500 hover:text-red-600"
                  @click="deleteCard(card)"
                ></FaIcon>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-end">
          <PaginationControls
            v-model="currentPage"
            class="my-8"
            :item-count="filteredItems.length"
            :page-size="pageSize"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
