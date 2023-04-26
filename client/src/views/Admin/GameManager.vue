<script lang="ts" setup>
import MemerLogo from "@/assets/memer_logo.svg?url";
import { collection } from "@firebase/firestore";
import { getDocs } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Category } from "../../../../types";
import MemerInput from "../../components/base/MemerInput.vue";
import { useClientPaging } from "../../composables/useClientPaging";
import { useUser } from "../../composables/useUser";
import { db } from "../../firebase";
import { backArrow, bars, card, lightbulb, xMark } from "../../services/icons";
import { mapCollection } from "../../utils/mapCollectionDocs";

const { push } = useRouter();
const { switchToAnonymousUser } = useUser();

const logout = () => switchToAnonymousUser().then(() => push("/"));

const categories = ref<Category[]>([]);
const { pageItems, prev, next, searchTerm } = useClientPaging<Category>(categories, {
  pageSize: 15,
  search(q, item) {
    return item.description.toLowerCase().includes(q?.toLowerCase() ?? "");
  },
});

const fetchAllCategories = async () => {
  const snapshot = await getDocs(collection(db, "categories"));
  categories.value = mapCollection<Category>(snapshot);
};

const drawerIsOpen = ref<boolean>(true);

onMounted(fetchAllCategories);
</script>

<template>
  <div class="flex h-screen">
    <div>
      <button
        class="z-10 w-12 h-12 flex items-center justify-center md:hidden absolute top-4 left-4 rounded-full bg-purple-400"
        title="SHOW PLAYERS"
        @click="drawerIsOpen = true"
      >
        <FaIcon :icon="bars" class="text-xl p-4 text-white"></FaIcon>
      </button>
      <aside
        :class="{
          '-translate-x-full': !drawerIsOpen,
          'translate-x-0 z-10': drawerIsOpen,
        }"
        class="overflow-hidden md:translate-x-0 md:relative md:z-0 w-full md:w-72 absolute flex flex-col justify-between bg-slate-800 h-full py-2 transition duration-300"
      >
        <div class="flex flex-col space-y-8">
          <div>
            <img :src="MemerLogo" class="w-full max-w-md block mx-auto" />
          </div>

          <div>
            <ul>
              <li
                class="py-4 hover:bg-purple-600 cursor-pointer flex justify-center md:justify-start text-3xl md:text-lg text-slate-100"
              >
                <div class="md:ml-6 flex items-center">
                  <FaIcon :icon="card" class="mr-3"></FaIcon>
                  CARDS
                </div>
              </li>
              <li
                class="py-4 hover:bg-purple-600 cursor-pointer flex justify-center md:justify-start text-3xl md:text-lg text-slate-100"
              >
                <div class="md:ml-6 flex items-center">
                  <FaIcon :icon="lightbulb" class="mr-3"></FaIcon>
                  CATEGORIES
                </div>
              </li>
            </ul>
          </div>

          <button class="absolute top-1 right-3 md:hidden">
            <FaIcon
              :icon="xMark"
              class="text-xl text-slate-400 hover:scale-x-105 hover:text-slate-200 transition-all"
              title="CLOSE"
              @click="drawerIsOpen = false"
            ></FaIcon>
          </button>
        </div>

        <div
          class="mb-6 text-slate-400 hover:text-slate-200 transition-colors text-center font-['Antonio'] text-lg"
        >
          <button class="tracking-wide" @click="logout">
            <FaIcon :icon="backArrow"></FaIcon>
            SIGN OUT
          </button>
        </div>
      </aside>
    </div>

    <div class="flex justify-center w-full overflow-auto">
      <div class="w-full md:w-3/4 xl:w-1/2 px-10 md:px-0">
        <h1 class="text-4xl text-white mt-4 text-center md:text-left">CARDS</h1>
        <h1
          class="text-xs text-slate-300 mt-2 mb-8 text-center md:text-left font-['Antonio'] tracking-wider"
        >
          MANAGE CAPTION CARDS
        </h1>
        <MemerInput v-model="searchTerm" placeholder="SEARCH" class="mb-6 w-full md:w-1/2" />
        <div class="w-full overflow-scroll">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 font-['Antonio']">
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Category</th>
                <th scope="col" class="px-6 py-3">SFW</th>
                <th scope="col" class="px-6 py-3">Created Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="category in pageItems"
                class="bg-white border-b dark:bg-slate-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white"
                >
                  {{ category.description }}
                </th>
                <td class="px-6 py-4">{{ category.safeForWork }}</td>
                <td class="px-6 py-4">{{ category.createdAt?.toDate() }}</td>
              </tr>
            </tbody>
          </table>
          <div class="flex mb-4">
            <button>Prev</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
