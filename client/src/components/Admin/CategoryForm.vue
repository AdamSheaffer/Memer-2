<script lang="ts" setup>
import { addDoc } from "firebase/firestore";
import { ref } from "vue";
import { Category } from "../../../../types";
import { categoriesCollectionRef } from "../../firebase";
import { plusCircle } from "../../services/icons";
import MemerButton from "../base/MemerButton.vue";
import MemerCheckbox from "../base/MemerCheckbox.vue";
import MemerInput from "../base/MemerInput.vue";

const emit = defineEmits<(event: "submit", form: Category) => void>();

const description = ref("");
const sfw = ref(true);
const isSaving = ref(false);

const submit = async () => {
  const category: Category = {
    description: description.value.toUpperCase(),
    safeForWork: sfw.value,
  };

  isSaving.value = true;

  try {
    const res = await addDoc(categoriesCollectionRef, category);
    category.uid = res.id;

    description.value = "";
    sfw.value = true;

    return emit("submit", category);
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="submit">
    <div class="flex flex-wrap w-full py-4 space-x-0 md:space-x-6 items-center">
      <div class="w-full md:w-1/2 py-2">
        <MemerInput
          v-model="description"
          placeholder="CATEGORY"
          maxlength="25"
          class="h-14 text-xl uppercase"
        />
      </div>
      <div class="text-white py-2">
        <MemerCheckbox id="sfw" v-model="sfw" label="Safe For Work?" />
      </div>
    </div>
    <MemerButton
      sound="affirmative"
      class="bg-purple-200"
      type="submit"
      :disabled="!description || isSaving"
    >
      <FaIcon :icon="plusCircle" class="mr-1"></FaIcon>
      ADD CATEGORY
    </MemerButton>
  </form>
</template>

<style scoped></style>
