import { refDebounced } from "@vueuse/core";
import { computed, reactive, ref, toRef, watch, watchEffect } from "vue";
import { Maybe } from "../../../types";
import { useUser } from "./useUser";

export const eyeOptions = {
  open: "OPEN",
  sleep: "SLEEPY",
  wink: "WINK",
  glasses: "GLASSES",
  happy: "HAPPY",
  sunglasses: "SUNGLASSES",
};
export const hairOptions = {
  long: "LONG",
  sideShave: "SIDE SHAVE",
  shortCombover: "COMB OVER",
  curlyHighTop: "CURLY HIGH-TOP",
  bobCut: "BOB",
  curly: "CURLY",
  pigtails: "PIGTAILS",
  curlyBun: "CURLY BUN",
  buzzcut: "BUZZ",
  bobBangs: "BOB-BANGS",
  bald: "BALD",
  balding: "BALDING",
  cap: "CAP",
  bunUndercut: "BUN UNDERCUT",
  fade: "FADE",
  beanie: "BEANIE",
  straightBun: "STRAIGHT BUN",
  extraLong: "EXTRA LONG",
  shortComboverChops: "COMB OVER CHOPS",
  mohawk: "MOHAWK",
};
export const bodyOptions = {
  squared: "SQUARED",
  rounded: "ROUNDED",
  small: "SMALL",
  checkered: "PLAID",
};
export const mouthOptions = {
  smile: "SMILE",
  frown: "FROWN",
  surprise: "SURPRISE",
  pacifier: "PACIFIER",
  bigSmile: "BIG SMILE",
  smirk: "SMIRK",
  lips: "LIPS",
};
export const noseOptions = {
  mediumRound: "MEDIUM",
  smallRound: "SMALL",
  wrinkles: "WRINKLES",
};
export const facialHairOptions = {
  none: "NONE",
  beardMustache: "GRIN BEARD",
  pyramid: "PYRAMID",
  walrus: "WALRUS",
  goatee: "GOATEE",
  shadow: "SHADOW",
  soulPatch: "SOUL PATCH",
};
export const hairColorOptions = {
  black: "BLACK",
  brunette: "BRUNETTE",
  red: "RED",
  pink: "PINK",
  copper: "COPPER",
  blonde: "BLONDE",
  grey: "GREY",
};
export const skinToneOptions = {
  tone1: "TONE 1",
  tone2: "TONE 2",
  tone3: "TONE 3",
  tone4: "TONE 4",
  tone5: "TONE 5",
  tone6: "TONE 6",
  tone7: "TONE 7",
  tone8: "TONE 8",
};
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

const { updateUser } = useUser();
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

const photoURL = computed(
  () =>
    `https://avatars.dicebear.com/api/personas/${debouncedUsername.value ?? "default"}.svg${
      queryString.value
    }`
);

const markAvatarAsSet = () => {
  localStorage.setItem("avatarSet", "true");
  needsAvatarSet.value = false;
};

export const useAvatar = () => {
  return { avatar, photoURL, needsAvatarSet, markAvatarAsSet };
};
