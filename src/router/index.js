import { createRouter, createWebHashHistory } from "vue-router";
import AppHome from "@/components/AppHome.vue";
import AppForm from "@/components/AppForm.vue";
import AppSuccess from "@/components/AppSuccess.vue";

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
  { path: '/success', 
    name:"Success",
    component: AppSuccess },
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
