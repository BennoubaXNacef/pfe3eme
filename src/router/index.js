import { createRouter, createWebHashHistory } from "vue-router";
import AppHome from "@/components/AppHome.vue";
import AppForm from "@/components/AppForm.vue";
import AppSuccess from "@/components/AppSuccess.vue";
import AdminDashboard from "@/Admin/AdminDashboard.vue";
import AffectationStagiaire from "@/Admin/AffectationStagiaire.vue";
import ModeleCNFCPP from "@/Admin/ModeleCNFCPP.vue";
import AttestationStage from "@/Admin/AttestationStage.vue";
import ConnectAdmin from "../connect/ConnectAdmin.vue";
import AdminRequests from "@/Admin/AdminRequests.vue";
import StatistiqueAdmin from "../Admin/StatistiqueAdmin.vue";
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
    path: "/connect",
    name: "connection",
    component: ConnectAdmin,
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
      {
        path: "modele-cnfcpp", // a URL-friendly path
        component: ModeleCNFCPP,
        name: "ModeleCNFCPP",
      },
      {
        path: "attestation-stage", // a URL-friendly path
        component: AttestationStage,
        name: "AttestationStage",
      },
      {
        path: "admin-requests", // a URL-friendly path
        component: AdminRequests,
        name: "AdminRequests",
      },
      {
        path: "admin-statistics",
        component: StatistiqueAdmin,
        name: "StatistiqueAdmin",
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
