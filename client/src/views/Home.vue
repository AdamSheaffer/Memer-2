<script setup lang="ts">
import MemerLogo from "@/assets/memer_logo.svg";
import BackgroundBox from "../components/base/BackgroundBox.vue";
</script>

<template>
  <BackgroundBox>
    <div>
      <h1 class="text-4xl md:text-6xl text-center">
        <span class="text-white text-shadow-lg">WELCOME TO </span>
        <span class="text-purple-400 text-shadow-lg">MEMER</span>
      </h1>
      <h2
        class="text-xl font-['Antonio'] tracking-wider text-center mt-6 text-gold-400 text-shadow"
      >
        GIVE THE GIF THAT KEEPS ON GIVING
      </h2>

      <img
        src="@/assets/PoweredbyGiphy_100px.png"
        alt="Powered By Giphy"
        class="mt-12 block mx-auto"
      />

      <div class="flex flex-col mt-12 space-y-4">
        <router-link
          to="/open-games"
          class="mx-auto bg-darkblue hover:bg-purple-400 hover:text-white hover:border-purple-600 border-2 border-purple-400 py-4 text-center text-2xl rounded-lg text-purple-400 w-96 cursor-pointer"
        >
          VIEW OPEN GAMES
        </router-link>

        <router-link
          to="/create"
          class="mx-auto bg-darkblue hover:bg-purple-400 hover:text-white hover:border-purple-600 border-2 border-purple-400 py-4 text-center text-2xl rounded-lg text-purple-400 w-96 cursor-pointer"
        >
          CREATE NEW GAME
        </router-link>
      </div>
    </div>
    <MemerLogo class="hidden lg:block absolute right-0 bottom-0" />
  </BackgroundBox>
</template>
