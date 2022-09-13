import { RouteRecordRaw } from "vue-router";

const pathMatchRoute: RouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: "NotFound",
  component: () => import("@/views/404.vue"),
  meta: {
    title: "404not found",
  },
};

export default pathMatchRoute;
