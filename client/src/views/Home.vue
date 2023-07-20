<script setup lang="ts">
import MemerLogo from "@/assets/memer_logo.svg?component";
import BackgroundBox from "../components/base/BackgroundBox.vue";
import MemerButton from "../components/base/MemerButton.vue";
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
        <MemerButton
          to="/open-games"
          outline
          color="purple"
          sound="affirmative"
          class="mx-auto hover:bg-purple-400 hover:text-white py-4 text-lg md:text-2xl w-56 md:w-96"
        >
          VIEW OPEN GAMES
        </MemerButton>

        <MemerButton
          to="/create"
          outline
          color="purple"
          sound="affirmative"
          class="mx-auto hover:bg-purple-400 hover:text-white border-2 py-4 text-lg md:text-2xl w-56 md:w-96"
        >
          CREATE NEW GAME
        </MemerButton>
      </div>
    </div>
    <MemerLogo class="hidden lg:block absolute right-0 bottom-0" />
  </BackgroundBox>
</template>
