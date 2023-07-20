<script lang="ts" setup>
import { addDoc } from "firebase/firestore";
import { ref } from "vue";
import { Card } from "../../../../types";
import { captionsCollectionRef } from "../../firebase";
import { plusCircle } from "../../services/icons";
import MemerButton from "../base/MemerButton.vue";
import MemerCheckbox from "../base/MemerCheckbox.vue";
import MemerInput from "../base/MemerInput.vue";

const emit = defineEmits<(event: "submit", form: Card) => void>();

const isSaving = ref(false);
const form = ref({
  top: "",
  bottom: "",
  safeForWork: false,
});

const submit = async () => {
  const card: Card = {
    top: form.value.top.toUpperCase(),
    bottom: form.value.bottom.toUpperCase(),
    safeForWork: form.value.safeForWork,
  };

  isSaving.value = true;

  try {
    const res = await addDoc(captionsCollectionRef, card);
    card.uid = res.id;

    form.value.top = "";
    form.value.bottom = "";
    form.value.safeForWork = false;

    return emit("submit", card);
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="submit">
    <div class="w-full py-4 space-x-0 items-center">
      <div class="w-full md:w-1/2 py-2">
        <MemerInput
          v-model="form.top"
          placeholder="TOP"
          maxlength="25"
          class="h-14 text-xl uppercase"
        />
      </div>
      <div class="w-full md:w-1/2 py-2">
        <MemerInput
          v-model="form.bottom"
          placeholder="BOTTOM"
          maxlength="25"
          class="h-14 text-xl uppercase"
        />
      </div>
      <div class="w-full md:w-1/2 py-2">
        <div class="text-white py-2">
          <MemerCheckbox id="sfw" v-model="form.safeForWork" label="Safe For Work?" />
        </div>
      </div>
    </div>
    <MemerButton
      sound="affirmative"
      class="bg-purple-200"
      type="submit"
      :disabled="(!form.top && !form.bottom) || isSaving"
    >
      <FaIcon :icon="plusCircle" class="mr-1"></FaIcon>
      ADD CATEGORY
    </MemerButton>
  </form>
</template>

<style scoped></style>
