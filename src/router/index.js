import { createRouter, createWebHashHistory } from "vue-router";
import AppHome from "@/components/AppHome.vue"; // Update the path based on your project structure
import AppForm from "@/components/AppForm.vue"; // Update the path based on your project structure

const routes = [
  {
    path: "/",
    name: "Home",
    components: {default:AppHome,},
  },
  {
    path: "/form",
    name: "Form",
    components: {default:AppForm,},
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
