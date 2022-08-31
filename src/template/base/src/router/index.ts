import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [];

const modules: any = import.meta.glob("./modules/*.ts", { eager: true });
for (const path in modules) {
  routes.push(modules[path].default);
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  strict: false,
});

router.beforeEach((to, from, next) => {
  next();
});

router.afterEach(() => {});

export default router;
