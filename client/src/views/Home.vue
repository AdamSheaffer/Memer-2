<script setup lang="ts">
import MemerLogo from "@/assets/memer_logo.svg";
</script>

<template>
  <div>
    <h1>MEMER</h1>
    <h3>This will be a beautiful welcome screen one day!</h3>
    <router-link to="/open-games">View Open Games</router-link>
    <router-link to="/create">Create New Game</router-link>
    <MemerLogo class="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full" />
  </div>
</template>

<style></style>
