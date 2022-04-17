import { defineStore } from "pinia";
import { Maybe, User as MemerUser } from "../../../types";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as Maybe<MemerUser>,
    initialAuthenticationChecked: false,
  }),
});
