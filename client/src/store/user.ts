import { defineStore } from "pinia";
import { Maybe, User } from "../types";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as Maybe<User>,
    initialAuthenticationChecked: false,
  }),
  // actions: {
  //   async login() {
  //     const credentials = await googleLogin();
  //     const user = await handleSignIn(credentials.user);
  //     this.user = user;
  //     return this.user;
  //   },
  // },
});
