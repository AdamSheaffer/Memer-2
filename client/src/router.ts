import { logEvent } from "firebase/analytics";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { analytics } from "./firebase";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/Home.vue"),
  },
  {
    path: "/create",
    name: "Create Game",
    component: () => import("./views/CreateGame.vue"),
  },
  {
    path: "/open-games",
    name: "Open Games",
    component: () => import("./views/OpenGames.vue"),
  },
  {
    path: "/game/:id",
    name: "Game Room",
    component: () => import("./views/GameRoom.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Not Found",
    component: () => import("./views/NotFound.vue"),
  },
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
