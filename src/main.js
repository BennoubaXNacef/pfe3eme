import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Ensure this is correctly imported
import { createVuetify } from "vuetify";
import "vuetify/styles"; // Import Vuetify styles

// Optional: Import font loader utility if you have one
import { loadFonts } from "./plugins/webfontloader";
import AppHome from "@/components/AppHome.vue";
// Load fonts if you're using any custom fonts via webfontloader
loadFonts();

// Create the Vue application instance
const app = createApp(App);

// Create and configure the Vuetify instance
const vuetify = createVuetify();

// Use Vuetify instance
app.use(vuetify);

// Setup Vue Router
app.use(router);

// Register global components if you have any
app.component("AppHome", AppHome);

// Mount the application to the DOM
app.mount("#app");
