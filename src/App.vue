<template>
  <v-app>
    <v-app-bar
      :elevation="5"
      app
      color="#001e8c"
      dark
      :scroll-target="$vuetify"
      :scroll-threshold="100"
    >
      <div class="d-flex align-center">
        <v-img
          :src="require('@/assets/logo.png')"
          alt="Logo"
          contain
          max-height="40"
          max-width="40"
          class="logo"
        ></v-img>
        <v-app-bar-title>Tunisie Telecom</v-app-bar-title>
      </div>
    </v-app-bar>
    <AppFooter></AppFooter>
  </v-app>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
export default {
  components: {
    AppFooter,
  },
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin"], // Add your social media icons
    };
  },
};
</script>

<style scoped>
.bg-indigo-lighten-1 {
  background-color: #001e8c;
  color: white;
}
</style>
