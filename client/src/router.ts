import { logEvent } from "firebase/analytics";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { useUser } from "./composables/useUser";
import { analytics } from "./firebase";

const { profile, signInWithGoogle } = useUser();

export const HOME: RouteRecordRaw = {
  path: "/",
  name: "Home",
  component: () => import("./views/Home.vue"),
};

export const CREATE_GAME: RouteRecordRaw = {
  path: "/create",
  name: "Create Game",
  component: () => import("./views/CreateGame.vue"),
};

export const OPEN_GAMES: RouteRecordRaw = {
  path: "/open-games",
  name: "Open Games",
  component: () => import("./views/OpenGames.vue"),
};

export const GAME_ROOM: RouteRecordRaw = {
  path: "/game/:id",
  name: "Game Room",
  component: () => import("./views/GameRoom.vue"),
};

// Admin Routes
export const CATEGORY_MANAGER: RouteRecordRaw = {
  path: "/game-manager/categories",
  name: "Category Manager",
  component: () => import("./views/Admin/CategoryManager.vue"),
};

export const CARD_MANAGER: RouteRecordRaw = {
  path: "/game-manager/cards",
  name: "Card Manager",
  component: () => import("./views/Admin/CardManager.vue"),
};

export const GAME_MANAGER: RouteRecordRaw = {
  path: "/game-manager",
  name: "Game Manager",
  component: () => import("./views/Admin/GameManager.vue"),
  children: [{ path: "", redirect: CATEGORY_MANAGER.path }, CARD_MANAGER, CATEGORY_MANAGER],
  beforeEnter() {
    const hasSufficientPrivileges = Boolean(
      profile.value?.verified && (profile.value?.roles.admin || profile.value?.roles.editor)
    );

    if (!profile.value) {
      return signInWithGoogle();
    }

    if (profile.value && !hasSufficientPrivileges) {
      return NO_ACCESS.path;
    }

    return true;
  },
};

// Bad Routes
export const NO_ACCESS: RouteRecordRaw = {
  path: "/no-access",
  name: "No Access",
  component: () => import("./views/Admin/NoAccess.vue"),
};

export const NOT_FOUND: RouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: "Not Found",
  component: () => import("./views/NotFound.vue"),
};

const routes: RouteRecordRaw[] = [
  HOME,
  CREATE_GAME,
  OPEN_GAMES,
  GAME_ROOM,
  GAME_MANAGER,
  NO_ACCESS,
  NOT_FOUND,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  if (import.meta.env.MODE === "production") {
    logEvent(analytics, "screen_view", {
      firebase_screen: to.name?.toString(),
      firebase_screen_class: to.matched[0].name?.toString(),
    });
  }
});

export default router;
