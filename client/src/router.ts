import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Role } from "../../types";
import { useUserStore } from "./store/user";

declare module "vue-router" {
  interface RouteMeta {
    requiresRoles?: Role[];
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/Home.vue"),
    meta: {
      requiresRoles: [Role.player],
    },
  },
  {
    path: "/create",
    name: "Create Game",
    component: () => import("./views/CreateGame.vue"),
    meta: {
      requiresRoles: [Role.player],
    },
  },
  {
    path: "/open-games",
    name: "Open Games",
    component: () => import("./views/OpenGames.vue"),
    meta: {
      requiresRoles: [Role.player],
    },
  },
  {
    path: "/game/:id",
    name: "Game Room",
    component: () => import("./views/GameRoom.vue"),
    meta: {
      requiresRoles: [Role.player],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("./views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { user } = useUserStore();

  const roles = [
    ...new Set(to.matched.flatMap((route) => route.meta.requiresRoles ?? [])),
  ] as Role[];

  if (roles?.length) {
    if (!user) {
      return next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }

    const meetsAllRequirements = roles.every((role) => {
      const userRoles = user?.roles ?? {};
      return Boolean(userRoles[role]);
    });
    if (meetsAllRequirements) return next();

    return next({
      path: "/not-found",
    });
  }

  return next();
});

export default router;
