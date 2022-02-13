import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import GameRoom from "./views/GameRoom.vue";
import Home from "./views/Home.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/game/:id",
    name: "Game Room",
    component: GameRoom,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
