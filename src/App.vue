<template>
  <v-app>

    <!-- Main Content (Routed Components) -->
    <router-view></router-view>

    <!-- Footer -->
    <v-footer class="bg-indigo-lighten-1 text-center d-flex flex-column">
      <div>
        <v-icon
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :color="'white'"
          :size="'24'"
        >
          {{ icon }}
        </v-icon>
      </div>

      <div class="pt-0">Your text content</div>

      <v-divider></v-divider>

      <div>{{ new Date().getFullYear() }} — <strong>Vuetify</strong></div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin"],
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
