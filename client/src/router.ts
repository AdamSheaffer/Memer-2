import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
