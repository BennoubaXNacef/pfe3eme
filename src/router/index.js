import { createRouter, createWebHashHistory } from "vue-router";
import AppHome from "@/components/AppHome.vue";
import AppForm from "@/components/AppForm.vue";
import AppBackendData from "@/components/AppBackendData.vue"; // Add a component to display data from the backend

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
    component: AppBackendData, // Route to a component that fetches and displays data from the backend
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
