<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer app permanent>
      <v-list dense>
        <v-list-item
          link
          v-for="item in menuItems"
          :key="item.text"
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar app color="deep-purple accent-4" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Admin Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Main Content Area -->
    <v-main>
      <v-container>
        <router-view></router-view>
        <!-- Dashboard Widgets -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "AdminDashboard",
  data() {
    return {
      menuItems: [
        {
          icon: "mdi-account-hard-hat",
          text: "Affectation Stagiaire",
          path: "/admin/affectation-stagiaire",
        },
        {
          icon: "mdi-file-document-edit",
          text: "Modèle CNFCPP",
          path: "/admin/modele-cnfcpp", // This should match the router path
        },
        {
          icon: "mdi-certificate",
          text: "Attestation de Stage",
          path: "/admin/attestation-stage",
        },
        {
          icon: "mdi-chart-areaspline",
          text: "Statistics",
          path: "/admin/statistics",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Additional styling can be added here */
</style>
