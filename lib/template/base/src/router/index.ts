import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = []

const modules = import.meta.glob<any>('./modules/*.ts', { eager: true })
for (const path in modules) {
  if (Array.isArray(modules[path].default)) {
    modules[path].default.map((v: any) => routes.push(v))
  } else {
    routes.push(modules[path].default)
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  strict: false,
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(() => {})

export default router
