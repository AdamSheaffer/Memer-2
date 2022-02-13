import { defineStore } from "pinia";
import { Maybe, User } from "../../../types";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as Maybe<User>,
    initialAuthenticationChecked: false,
  }),
});
