import { RouteRecordRaw } from "vue-router";

const homeRoute: RouteRecordRaw = {
  path: "/",
  name: "home",
  component: () => import("@/views/home.vue"),
  children: [],
};

export default homeRoute;
