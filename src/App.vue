<template>
  <v-app>
    <div id="app">
      <router-view></router-view>
    </div>

    <div v-if="!isAdminRoute" class="overlay-container">
      <div class="overlay-image"></div>
      <div class="gradient-overlay"></div>

      <v-row no-gutters justify="center" align="center" class="text-center">
        <!-- Contact Information Box -->
        <v-col cols="12" sm="12" md="3" class="contact-box">
          <v-card
            class="mx-auto custom-bg elevation-12"
            max-width="95%"
            height="500"
            hover
            color="white"
          >
            <v-card-item>
              <v-card-title class="custom-padding headline"
                ><h3>Nous Contacter</h3></v-card-title
              >
              <br />
            </v-card-item>
            <v-card-text class="custom-card-text">
              On se fera un plaisir de vous répondre.
              <br />
              <v-row>
                <v-col cols="2"><v-icon color="black">mdi-email</v-icon></v-col>
                <v-col cols="10"><span>contact@example.com</span></v-col>
              </v-row>
              <v-row>
                <v-col cols="2"><v-icon color="black">mdi-phone</v-icon></v-col>
                <v-col cols="10"><span>+1234567890</span></v-col>
              </v-row>
              <v-row>
                <v-col cols="2"
                  ><v-icon color="black">mdi-map-marker</v-icon></v-col
                >
                <v-col cols="10"><span>123 Street, City</span></v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Message Form Box -->
        <v-col cols="12" sm="12" md="9" class="message-box">
          <v-card
            class="mx-auto custom-bg elevation-12"
            max-width="95%"
            height="500"
            hover
            color="white"
          >
            <v-card-item>
              <v-card-title class="custom-padding headline"
                ><h3>Nous écrire</h3></v-card-title
              >
            </v-card-item>
            <v-card-text class="custom-card-text">
              <v-form>
                <v-text-field v-model="nom" label="Nom" required></v-text-field>
                <v-text-field
                  v-model="email"
                  label="Adresse courriel"
                  required
                  type="email"
                ></v-text-field>
                <v-textarea
                  v-model="message"
                  label="Message"
                  required
                  rows="5"
                ></v-textarea>
                <v-row class="justify-end align-center">
                  <v-btn
                    color="primary"
                    rounded="xl"
                    class="send-button"
                    @click="sendForm"
                    >Envoyer</v-btn
                  >
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-footer v-if="!isAdminRoute" class="app-footer">
      <h5>
        © {{ new Date().getFullYear() }} Tunisie Telecom Gabes. Tous droits
        réservés.
      </h5>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return { isAdminRoute: false };
  },

  watch: {
    $route(to) {
      this.isAdminRoute = to.path === "/connect";
    },
  },
  mounted() {
    this.isAdminRoute = this.$route.path === "/connect";
  },
};
</script>

<style scoped>
.overlay-container {
  position: relative;
  min-height: 100vh;
}
.overlay-image {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/work.jpg");
  background-size: cover;
  background-position: center;
}
.gradient-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(18, 2, 126, 0.73),
    rgba(1, 3, 44, 0.7)
  );
  z-index: 0; /* Above the image but below the content */
}
.custom-bg {
  background-color: white;
  color: black;
}
.custom-padding,
.custom-card-text {
  color: black;
  padding: 20px;
}
.contact-box,
.message-box {
  margin-top: 5%;
}
.app-footer {
  background-color: transparent; /* Make the footer background transparent */
  color: grey;
  padding: 15px;
  text-align: center;
  width: 100%;
  position: relative;
  z-index: 2; /* Ensure footer content is visible */
}
/* Responsive adjustments */
@media (max-width: 992px) {
  .contact-box,
  .message-box {
    margin-top: 2%;
    margin-left: 5%;
    margin-right: 5%;
  }
}
@media (max-width: 600px) {
  .send-button {
    width: 100%;
  }
}
</style>
