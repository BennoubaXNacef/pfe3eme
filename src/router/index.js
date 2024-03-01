import { createRouter, createWebHashHistory } from "vue-router";
import AppHome from "@/components/AppHome.vue";
import AppForm from "@/components/AppForm.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: AppHome,
  },
  {
    path: "/form",
    name: "Form",
    component: AppForm,
  },
  {
    path: "/backend-data",
    name: "BackendData",
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
