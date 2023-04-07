import { refDebounced } from "@vueuse/core";
import { computed, reactive, ref, toRef, watch, watchEffect } from "vue";
import { Maybe } from "../../../types";
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
import { useUser } from "./useUser";

export interface AvatarAttributes {
  name: string;
  eyes: Maybe<keyof typeof eyeOptions>;
  hair: Maybe<keyof typeof hairOptions>;
  body: Maybe<keyof typeof bodyOptions>;
  mouth: Maybe<keyof typeof mouthOptions>;
  nose: Maybe<keyof typeof noseOptions>;
  facialHair: Maybe<keyof typeof facialHairOptions>;
  hairColor: Maybe<keyof typeof hairColorOptions>;
  skinColor: Maybe<keyof typeof skinToneOptions>;
}

const avatarObj = JSON.parse(localStorage.getItem("avatar") ?? "{}");
const avatar = reactive<AvatarAttributes>({
  name: "RANDO",
  eyes: null,
  hair: null,
  body: null,
  mouth: null,
  nose: null,
  facialHair: null,
  hairColor: null,
  skinColor: null,
  ...avatarObj,
});
const needsAvatarSet = ref(localStorage.getItem("avatarSet") !== "true");
const usernameRef = toRef(avatar, "name");
const debouncedUsername = refDebounced(usernameRef, 1000);
watchEffect(() => localStorage.setItem("avatar", JSON.stringify(avatar)));

watch(usernameRef, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    const { updateUser } = useUser();
    updateUser({ username: usernameRef.value, photoURL: photoURL.value });
  }
});

const queryString = computed(() => {
  const params = Object.entries(avatar)
    .filter(([key, val]) => !!val)
    .map(([key, val]) => (val === "none" ? `${key}[]` : `${key}=${val}`))
    .join("&");

  return params ? `?${params}` : "";
});

const photoURL = computed(() =>
  encodeURI(
    `https://avatars.dicebear.com/api/personas/${debouncedUsername.value ?? "default"}.svg${
      queryString.value
    }`
  )
);

const markAvatarAsSet = () => {
  localStorage.setItem("avatarSet", "true");
  needsAvatarSet.value = false;
};

export const useAvatar = () => {
  return { avatar, photoURL, needsAvatarSet, markAvatarAsSet };
};
