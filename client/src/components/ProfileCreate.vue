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

const upperCaseOnUsernameInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  avatar.name = target.value.toUpperCase();
};

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
      @submit.prevent="onSave"
      class="flex flex-1 flex-col justify-between mr-auto mt-4 pl-6 tracking-wider"
    >
      <div class="flex flex-row flex-wrap font-['Antonio']">
        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerInput
            autofocus
            label="USERNAME"
            type="text"
            id="username"
            :value="avatar.name"
            @input="upperCaseOnUsernameInputChange"
            placeholder="MEME LORD"
            required
            maxlength="12"
          />
        </div>

        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerSelect
            v-model="avatar.eyes"
            id="eyes"
            label="EYES"
            null-option
            :options="eyeOptions"
          />
        </div>

        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerSelect
            v-model="avatar.hair"
            label="HAIR"
            id="hair"
            null-option
            :options="hairOptions"
          />
        </div>

        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerSelect
            v-model="avatar.body"
            label="BODY"
            id="body"
            null-option
            :options="bodyOptions"
          />
        </div>

        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerSelect
            v-model="avatar.mouth"
            label="MOUTH"
            id="mouth"
            null-option
            :options="mouthOptions"
          />
        </div>

        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerSelect
            v-model="avatar.nose"
            label="NOSE"
            id="nose"
            null-option
            :options="noseOptions"
          />
        </div>

        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerSelect
            v-model="avatar.facialHair"
            label="FACIAL HAIR"
            id="facial_hair"
            null-option
            :options="facialHairOptions"
          />
        </div>

        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerSelect
            v-model="avatar.hairColor"
            label="HAIR COLOR"
            id="hair_color"
            null-option
            :options="hairColorOptions"
          />
        </div>

        <div class="w-1/2 sm:w-1/3 p-2 mb-1">
          <MemerSelect
            v-model="avatar.skinColor"
            label="SKIN TONE"
            id="skin_tone"
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
