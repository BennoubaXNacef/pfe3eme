<template>
  <br />
  <br />
  <v-app-bar app color="#001e8c" dark :elevation="5">
      <v-img
        :src="require('@/assets/logott.png')"
        alt="Logo"
        max-height="40"
        max-width="40"
        class="logo"
      ></v-img>
      <v-app-bar-title>Tunisie Telecom</v-app-bar-title>
      <div class="navigation">
      <a href="#">Accueil</a>
      <a href="#">Fiche de Renseignement</a>
      <a href="#">Contact</a>
    </div>
    </v-app-bar>
   <br />
   <br />
   <div class="section">
    <v-container class="text-container"  width="500" >
    <h1 class="boldtext" style="color: white;">Bienvenue !</h1> 
    <p style="color: whitesmoke;">Nous sommes ravis de vous accueillir dans notre équipe en tant que stagiaire. Votre candidature a été reçue.
    Votre message d'acceptation officielle sera envoyé très prochainement par mail. En attendant, préparez-vous à vous plonger 
    dans une expérience enrichissante et à contribuer de manière significative à notre mission.
    Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter.</p> 
    </v-container>
  </div>
  <div class="section">
    <div class="overlay-container">
      <div class="overlay-image"></div>
      <div class="gradient-overlay"></div> 
      <v-row>
      <v-col cols="10" md="6">
        <br/>
        <br/><br/>
        <br/>
        <v-card
          class="mx-auto custom-bg"
          max-width="300"
          hover
          color="white"
        >
          <v-card-item>
            <v-card-title class="custom-padding">Nous Contacter</v-card-title>
            <br/>
          </v-card-item>

          <v-card-text class="custom-card-text"
            >On se fera un plaisir de vous répondre.
            <br/>
            <br/>
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

      <v-col cols="12" md="3">
        <br/>
        <br/><br/>
        <br/>
        <v-card
          class="mx-auto custom-bg"
          max-width="800"
          hover
          color="white"
        >
          <v-card-item>
            <v-card-title class="custom-padding">Nous écrire</v-card-title>
          </v-card-item>
          <v-card-text class="custom-card-text">
    <v-form>
      <!-- Nom -->
      <v-text-field
        v-model="nom"
        label="Nom"
        required
      ></v-text-field>

      <!-- Adresse courriel (Email) -->
      <v-text-field
        v-model="email"
        label="Adresse courriel"
        required
        type="email"
      ></v-text-field>

      <!-- Message -->
      <v-textarea
        v-model="message"
        label="Message"
        required
        rows="5"
      ></v-textarea>

      <!-- Envoyer (Send) Button -->
      <v-row class="justify-end">
        <v-btn color="white" @click="sendForm">Envoyer</v-btn>
      </v-row>
    </v-form>
  </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    </div>
  </div>
  <footer class="app-footer">
    <p class="copyright">© 2024 Tunisie Telecom Gabes. Tous droits réservés.</p>
  </footer>
</template>

  <script>
  export default {
    data() {
      return {
      };
  },
}
  </script>
  
  <style scoped>
  .navigation {
  display: flex;
}
.navigation a {
  color: #c7bdfb; 
  text-decoration: none;
  margin-left: 20px; 
}

.navigation a:hover {
  text-decoration: underline;
}
  .section {
  margin-bottom: 30px; 
  padding-top: 60px;
}
.text-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  height: 30vh;
  background: linear-gradient(
    to right,
    rgb(119, 0, 255),
    rgb(255, 128, 0)
  ); 
  border-radius: 40px;
}
.overlay-container {
  position: relative;
  height: 100vh; /* Adjust height based on your design */
  
}

.overlay-image {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/work.jpg"); /* Add your image path */
  background-size: cover;
  background-position: center;
}
.gradient-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(23, 6, 130, 0.73), rgba(2, 63, 37, 0.7)); 
}
.custom-bg {
  color: rgb(0, 0, 0); /* Optional: Set text color to white for better visibility */
  border-radius: 40px;
}
.custom-padding {
  padding-top: 40px;
  color: #000000;
}
.custom-card-text {
  margin-top: -5px; /* Adjust the value for less space */
  color: #000000 ;
  opacity: 0.8;
}
.app-footer {
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
}
  </style>
  