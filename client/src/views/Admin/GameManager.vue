<script lang="ts" setup>
import MemerLogo from "@/assets/memer_logo.svg?url";
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useUser } from "../../composables/useUser";
import { CARD_MANAGER, CATEGORY_MANAGER } from "../../router";
import { backArrow, bars, card, lightbulb, xMark } from "../../services/icons";

const { push } = useRouter();
const { switchToAnonymousUser } = useUser();
const logout = () => switchToAnonymousUser().then(() => push("/"));

const drawerIsOpen = ref<boolean>(true);
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
              <router-link
                v-slot="{ isActive }"
                :to="CARD_MANAGER.path"
                @click="drawerIsOpen = false"
              >
                <li
                  class="py-4 cursor-pointer flex justify-center md:justify-start text-3xl md:text-lg text-slate-100"
                  :class="{ 'bg-slate-700': isActive }"
                >
                  <div class="md:ml-6 flex items-center">
                    <FaIcon :icon="card" class="mr-3"></FaIcon>
                    CARDS
                  </div>
                </li>
              </router-link>
              <router-link
                v-slot="{ isActive }"
                :to="CATEGORY_MANAGER.path"
                @click="drawerIsOpen = false"
              >
                <li
                  class="py-4 cursor-pointer flex justify-center md:justify-start text-3xl md:text-lg text-slate-100"
                  :class="{ 'bg-slate-700': isActive }"
                >
                  <div class="md:ml-6 flex items-center">
                    <FaIcon :icon="lightbulb" class="mr-3"></FaIcon>
                    CATEGORIES
                  </div>
                </li>
              </router-link>
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

    <router-view></router-view>
  </div>
</template>

<style scoped></style>
