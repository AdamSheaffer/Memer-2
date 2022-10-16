<script lang="ts" setup>
import {
  AvatarAttributes,
  bodyOptions,
  eyeOptions,
  facialHairOptions,
  hairColorOptions,
  hairOptions,
  mouthOptions,
  noseOptions,
  skinToneOptions,
  useAvatar,
} from "../composables/useAvatar";
import MemerButton from "./base/MemerButton.vue";

defineProps<{ saveBtnText?: string }>();
const emit = defineEmits<(event: "submit", avatar: AvatarAttributes) => void>();
const { avatar, photoURL } = useAvatar();

const onSave = () => emit("submit", avatar);
</script>

<template>
  <div class="flex flex-col items-center p-4 h-full">
    <div>
      <img
        :src="photoURL"
        alt="Avatar"
        class="w-16 sm:w-48 md:w-64 bg-teal-500 border-gold-500 border-4 rounded-lg"
      />
    </div>
    <form
      @submit.prevent="onSave"
      class="flex flex-1 flex-col justify-between mr-auto mt-4 pl-6 tracking-widest"
    >
      <div class="flex flex-row flex-wrap font-['Antonio']">
        <div class="w-1/2 sm:w-1/3 p-2">
          <label
            for="first_name"
            class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >USERNAME</label
          >
          <input
            type="text"
            id="first_name"
            v-model="avatar.name"
            class="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            placeholder="RANDO"
            required
            maxlength="20"
          />
        </div>

        <div class="w-1/2 sm:w-1/3 p-2">
          <label
            for="first_name"
            class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
          >
            EYES
          </label>
          <select
            v-model="avatar.eyes"
            class="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          >
            <option :value="null">---</option>
            <option v-for="(value, key) in eyeOptions" :key="key" :value="key">
              {{ value }}
            </option>
          </select>
        </div>

        <div class="w-1/2 sm:w-1/3 p-2">
          <label
            for="first_name"
            class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
          >
            HAIR
          </label>
          <select
            v-model="avatar.hair"
            class="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          >
            <option :value="null">---</option>
            <option v-for="(value, key) in hairOptions" :key="key" :value="key">
              {{ value }}
            </option>
          </select>
        </div>

        <div class="w-1/2 sm:w-1/3 p-2">
          <label
            for="first_name"
            class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
          >
            BODY
          </label>
          <select
            v-model="avatar.body"
            class="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          >
            <option :value="null">---</option>
            <option v-for="(value, key) in bodyOptions" :key="key" :value="key">
              {{ value }}
            </option>
          </select>
        </div>

        <div class="w-1/2 sm:w-1/3 p-2">
          <label
            for="first_name"
            class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
          >
            MOUTH
          </label>
          <select
            v-model="avatar.mouth"
            class="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          >
            <option :value="null">---</option>
            <option v-for="(value, key) in mouthOptions" :key="key" :value="key">
              {{ value }}
            </option>
          </select>
        </div>

        <div class="w-1/2 sm:w-1/3 p-2">
          <label
            for="first_name"
            class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
          >
            NOSE
          </label>
          <select
            v-model="avatar.nose"
            class="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          >
            <option :value="null">---</option>
            <option v-for="(value, key) in noseOptions" :key="key" :value="key">
              {{ value }}
            </option>
          </select>
        </div>

        <div class="w-1/2 sm:w-1/3 p-2">
          <label
            for="first_name"
            class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
          >
            FACIAL HAIR
          </label>
          <select
            v-model="avatar.facialHair"
            class="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          >
            <option :value="null">---</option>
            <option v-for="(value, key) in facialHairOptions" :key="key" :value="key">
              {{ value }}
            </option>
          </select>
        </div>

        <div class="w-1/2 sm:w-1/3 p-2">
          <label
            for="first_name"
            class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
          >
            HAIR COLOR
          </label>
          <select
            v-model="avatar.hairColor"
            class="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          >
            <option :value="null">---</option>
            <option v-for="(value, key) in hairColorOptions" :key="key" :value="key">
              {{ value }}
            </option>
          </select>
        </div>

        <div class="w-1/2 sm:w-1/3 p-2">
          <label
            for="first_name"
            class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
          >
            SKIN TONE
          </label>
          <select
            v-model="avatar.skinColor"
            class="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          >
            <option :value="null">---</option>
            <option v-for="(value, key) in skinToneOptions" :key="key" :value="key">
              {{ value }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex flex-row px-2">
        <MemerButton
          color="teal"
          class="w-full ml-auto md:w-24 tracking-wider"
          data-avatar-save
          @click="onSave"
        >
          {{ saveBtnText ?? "SAVE" }}
        </MemerButton>
      </div>
    </form>
  </div>
</template>
