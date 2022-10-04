<script setup lang="ts">
import MemerLogo from "@/assets/memer_logo.svg";
</script>

<template>
  <div
    class="h-full w-full relative flex flex-row justify-center items-center px-12 bg-gradient-to-b from-purple-600 to-darkblue-300"
  >
    <div
      class="h-3/4 w-full lg:w-2/3 xl:w-1/2 mx-auto p-6 rounded-3xl shadow-[1rem_2rem_.8rem_.7rem_rgba(0,0,0,0.3)] bg-darkblue-500"
    >
      <div
        class="h-full rounded-3xl border-4 flex flex-col justify-center border-darkblue-300 bg-darkblue-500"
      >
        <div>
          <h1 class="text-4xl md:text-6xl text-center">
            <span class="text-white">WELCOME TO </span>
            <span class="text-purple-400">MEMER</span>
          </h1>
          <h2 class="text-xl font-['Antonio'] tracking-wider text-center mt-6 text-teal-400">
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
              class="mx-auto bg-white hover:bg-purple-400 hover:text-white hover:border-purple-600 border-2 border-purple-400 py-4 text-center text-2xl rounded-md text-purple-400 w-96 cursor-pointer"
            >
              VIEW OPEN GAMES
            </router-link>

            <router-link
              to="/create"
              class="mx-auto bg-white hover:bg-purple-400 hover:text-white hover:border-purple-600 border-2 border-purple-400 py-4 text-center text-2xl rounded-md text-purple-400 w-96 cursor-pointer"
            >
              CREATE NEW GAME
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <MemerLogo class="hidden lg:block absolute right-0 bottom-0" />
  </div>
</template>
