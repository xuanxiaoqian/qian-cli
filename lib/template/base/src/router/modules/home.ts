import { RouteRecordRaw } from "vue-router";

const homeRoute: RouteRecordRaw = {
  path: "/",
  name: "Home",
  component: () => import("@/views/Home.vue"),
  children: [],
};

export default homeRoute;
