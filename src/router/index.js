import { createRouter, createWebHashHistory } from "vue-router";
import AppHome from "@/components/AppHome.vue";
import AppForm from "@/components/AppForm.vue";
import AppSuccess from "@/components/AppSuccess.vue";
import AdminDashboard from "@/Admin/AdminDashboard.vue";
import AffectationStagiaire from "@/Admin/AffectationStagiaire.vue";

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
    path: "/success",
    name: "Success",
    component: AppSuccess,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminDashboard,
    meta: { isAdmin: true }, // This ensures the admin meta is set
    children: [
      {
        path: "affectation-stagiaire",
        component: AffectationStagiaire,
        name: "AffectationStagiaire",
      },
      // other child routes...
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
