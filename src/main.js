import { createApp } from "vue";
import App from "./App.vue";
import AppHome from "@/components/AppHome.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";

// Load fonts (if needed)
loadFonts();

// Create the Vue app instance
const app = createApp(App);

// Use the components and router
app.component("AppHome", AppHome);
app.use(vuetify);
app.use(router);

// Mount the app
app.use(vuetify).mount("#app");

