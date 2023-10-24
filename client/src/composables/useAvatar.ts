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

const diceBearBaseUrl = "https://api.dicebear.com/7.x/personas/svg";

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
watchEffect(() => localStorage.setItem("avatar", JSON.stringify(avatar)));

watch(usernameRef, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    const { updateUser } = useUser();
    updateUser({ username: usernameRef.value, photoURL: photoURL.value });
  }
});

const queryString = computed(() => {
  const params = Object.entries(avatar)
    .filter(([, val]) => !!val)
    .map(([key, val]) => {
      // unique conditions for facial hair and hair color
      if (key === "facialHair") {
        if (val === "none") {
          return "&facialHairProbability=0";
        } else {
          return `${key}=${val}&facialHairProbability=100`;
        }
      }

      return `${key}=${val}`;
    })
    .join("&");

  return params ? `?${params}` : "";
});

const photoURL = computed(() => {
  return encodeURI(`https://api.dicebear.com/7.x/personas/svg${queryString.value}`);
});

const markAvatarAsSet = () => {
  localStorage.setItem("avatarSet", "true");
  needsAvatarSet.value = false;
};

const resetLegacyUrl = () => {
  const localStorageUrl = localStorage.getItem("photoURL");
  if (!localStorageUrl?.startsWith(diceBearBaseUrl)) {
    avatar.eyes = null;
    avatar.hair = null;
    avatar.body = null;
    avatar.mouth = null;
    avatar.nose = null;
    avatar.facialHair = null;
    avatar.hairColor = null;
    avatar.skinColor = null;
    localStorage.setItem("photoURL", photoURL.value);
  }
};

export const useAvatar = () => {
  resetLegacyUrl();

  return { avatar, photoURL, needsAvatarSet, markAvatarAsSet };
};
