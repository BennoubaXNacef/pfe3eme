<template>
  <v-app> <div id="app">
  <router-view></router-view>
</div>
      <div class="overlay-container">
        <div class="overlay-image"></div>
        <div class="gradient-overlay"></div>

        <v-row no-gutters >
          <v-col cols="12" md="6" lg="6" xl="6" class="contact-box">
           
            <v-card class="mx-auto custom-bg"  width="300" max-width="800" height="450" hover color="white">
              <v-card-item>
                <v-card-title class="custom-padding"><h3>Nous Contacter</h3></v-card-title>
                <br>
              </v-card-item>
              <v-card-text class="custom-card-text">
                On se fera un plaisir de vous répondre.
                <br>
                <br>
                <br>
                <br>
                <v-row>
                  <v-col cols="2">
                    <v-icon color="black">mdi-email</v-icon>
                  </v-col>
                  <v-col cols="10">
                    <span>contact@example.com</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <v-icon color="black">mdi-phone</v-icon>
                  </v-col>
                  <v-col cols="10">
                    <span>+1234567890</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <v-icon color="black">mdi-map-marker</v-icon>
                  </v-col>
                  <v-col cols="10">
                    <span>123 Street, City</span>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6" lg="6" xl="6" class="message-box">
            <v-card class="mx-auto custom-bg" max-width="800" height="450" hover color="white">
              <v-card-item>
                <v-card-title class="custom-padding"><h3>Nous écrire</h3></v-card-title>
              </v-card-item>
              <v-card-text class="custom-card-text">
                <v-form>
                  <v-text-field v-model="nom" label="Nom" required></v-text-field>
                  <v-text-field v-model="email" label="Adresse courriel" required type="email"></v-text-field>
                  <v-textarea v-model="message" label="Message" required rows="5"></v-textarea>
                  <v-row class="justify-end">
                    <v-btn rounded="xl" width="14%" size="small"  variant="outlined" color="black" @click="sendForm">Envoyer</v-btn>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    <v-footer class="app-footer">
      <div class="copyright" style="color:grey;"><h5>© {{ new Date().getFullYear() }} Tunisie Telecom Gabes. Tous droits réservés.</h5></div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
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
  background: linear-gradient(to bottom, rgba(18, 2, 126, 0.73), rgba(1, 3, 44, 0.7));
}

.custom-bg {
  color: rgb(0, 0, 0);
}

.custom-padding {
  padding-top: 40px;
  color: #000000;
}

.custom-card-text {
  margin-top: -5px;
  color: #000000;
  opacity: 0.8;
}
.contact-box{
  margin-top: 8%;
  margin-left: 1.5%;
}
.message-box{
  margin-top: 8%;
  margin-left: -12%;
 
}
.app-footer {
  background-color: #232121;
  padding: 15px;
  text-align:center;
  width: 100%;
}
</style>
