<script lang="ts" setup>
import { AvatarAttributes, useAvatar } from "../composables/useAvatar";
import { useUser } from "../composables/useUser";
import {
  bodyOptions,
  eyeOptions,
  facialHairOptions,
  hairColorOptions,
  hairOptions,
  mouthOptions,
  noseOptions,
  skinToneOptions,
} from "../services/avatarOptions";
import MemerButton from "./base/MemerButton.vue";
import MemerInput from "./base/MemerInput.vue";
import MemerSelect from "./base/MemerSelect.vue";

defineProps<{ saveBtnText?: string }>();
const emit = defineEmits<(event: "submit", avatar: AvatarAttributes) => void>();
const { avatar, photoURL } = useAvatar();
const { updateUser } = useUser();

const onSave = () => {
  updateUser({ username: avatar.name, photoURL: photoURL.value });
  emit("submit", avatar);
};
</script>

<template>
  <div class="flex flex-col items-center p-4 h-full">
    <div>
      <img
        :src="photoURL"
        alt="Avatar"
        class="w-16 h-16 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-teal-500 border-gold-500 border-4 rounded-lg"
      />
    </div>
    <form
      class="flex flex-1 flex-col justify-between mr-auto mt-4 pl-6 tracking-wider"
      @submit.prevent="onSave"
    >
      <div class="flex flex-row flex-wrap font-['Antonio']">
        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerInput
            id="username"
            v-model="avatar.name"
            autofocus
            label="USERNAME"
            type="text"
            placeholder="MEME LORD"
            required
            maxlength="12"
          />
        </div>

        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerSelect
            id="eyes"
            v-model="avatar.eyes"
            label="EYES"
            null-option
            :options="eyeOptions"
          />
        </div>

        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerSelect
            id="hair"
            v-model="avatar.hair"
            label="HAIR"
            null-option
            :options="hairOptions"
          />
        </div>

        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerSelect
            id="body"
            v-model="avatar.body"
            label="BODY"
            null-option
            :options="bodyOptions"
          />
        </div>

        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerSelect
            id="mouth"
            v-model="avatar.mouth"
            label="MOUTH"
            null-option
            :options="mouthOptions"
          />
        </div>

        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerSelect
            id="nose"
            v-model="avatar.nose"
            label="NOSE"
            null-option
            :options="noseOptions"
          />
        </div>

        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerSelect
            id="facial_hair"
            v-model="avatar.facialHair"
            label="FACIAL HAIR"
            null-option
            :options="facialHairOptions"
          />
        </div>

        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerSelect
            id="hair_color"
            v-model="avatar.hairColor"
            label="HAIR COLOR"
            null-option
            :options="hairColorOptions"
          />
        </div>

        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerSelect
            id="skin_tone"
            v-model="avatar.skinColor"
            label="SKIN TONE"
            null-option
            :options="skinToneOptions"
          />
        </div>
      </div>

      <div class="flex flex-row px-2">
        <MemerButton
          color="teal"
          class="w-full ml-auto md:w-24 tracking-wider"
          data-avatar-save
          type="submit"
          sound="affirmative"
        >
          {{ saveBtnText ?? "SAVE" }}
        </MemerButton>
      </div>
    </form>
  </div>
</template>
