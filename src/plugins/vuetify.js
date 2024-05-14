// plugins/vuetify.js
import "vuetify/styles"; // Ensure Vuetify styles are loaded
import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components,
  directives,
  // Any theme or other global options go here
});
