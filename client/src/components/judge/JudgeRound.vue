<script lang="ts" setup>
import { useCategories } from "../../composeables/useCategories";
import { useGame } from "../../composeables/useGame";
import Button from "../base/Button.vue";

const props = defineProps<{ gameId: string }>();
const { getSomeCategories } = useCategories();
const { game, updateGame, judgeIsPickingCategory } = useGame(props.gameId);

const startTurn = async () => {
  const categories = await getSomeCategories();
  return updateGame({ tagOptions: categories });
};
</script>

<template>
  <div>
    <p>It's your turn</p>
    <p v-if="judgeIsPickingCategory">Select a Category</p>
    <Button v-if="!game?.tagOptions" @click="startTurn">Start Turn</Button>
  </div>
</template>

<style scoped></style>
