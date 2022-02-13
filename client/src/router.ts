import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CreateGame from "./views/CreateGame.vue";
import GameRoom from "./views/GameRoom.vue";
import Home from "./views/Home.vue";
import OpenGames from "./views/OpenGames.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/create",
    name: "Create Game",
    component: CreateGame,
  },
  {
    path: "/open-games",
    name: "Open Games",
    component: OpenGames,
  },
  {
    path: "/game/:id",
    name: "Game Room",
    component: GameRoom,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
