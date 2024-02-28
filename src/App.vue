<template>
  <!-- App Bar -->
  <v-app>
    <v-app-bar app color="#001e8c" dark :elevation="5">
      <v-img
        :src="require('@/assets/logott.png')"
        alt="Logo"
        max-height="40"
        max-width="40"
        class="logo"
      ></v-img>
      <v-app-bar-title>Tunisie Telecom</v-app-bar-title>
    </v-app-bar>

    <!-- Main Content (AppHome) -->
    <app-home></app-home>

    <!-- Footer -->
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppHome from "@/components/AppHome.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  components: {
    AppHome,
    AppFooter,
  },
};
</script>

<style scoped>
/* Add scoped styles here */
</style>

<style scoped>
.bg-indigo-lighten-1 {
  background-color: #001e8c;
  color: white;
}
</style>
