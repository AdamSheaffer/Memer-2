<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import { useUser } from "../composeables/useUser";
import Button from "./base/Button.vue";

const props = defineProps<{ gameId?: string }>();
const { user, updateUser } = useUser();
const username = ref(user.value?.username || "");

const onSave = () => updateUser({ username: username.value, photoURL: "" }, props.gameId);

const formValid = computed(() => !!username.value);
</script>

<template>
  <div>
    <form @submit.prevent="onSave">
      <div>
        <label for="username" class="block mb-2 text-sm font-medium"> NAME </label>
        <input
          v-model="username"
          type="text"
          id="username"
          class="ring-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          maxlength="20"
          required
        />
      </div>
      <Button type="submit" :disabled="!formValid">Save</Button>
    </form>
  </div>
</template>
