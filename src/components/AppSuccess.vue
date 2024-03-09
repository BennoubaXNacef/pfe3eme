<template>
  <div>
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

    <br>
    <br>

    <div class="section">
      <v-container class="text-container" width="500" >
        <h1 class="boldtext" style="color: black;">Bienvenue !</h1>
        <p style="color:midnightblue;">Nous sommes ravis de vous accueillir dans notre équipe en tant que stagiaire. Votre candidature a été reçue.
          Votre message d'acceptation officielle sera envoyé très prochainement par mail. En attendant, préparez-vous à vous plonger
          dans une expérience enrichissante et à contribuer de manière significative à notre mission.
          Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter.</p>
          <v-img
          src="@/assets/cute.jpg" 
          alt="Photo"
          height="200"
          width="200"
        ></v-img>

      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
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
  margin-bottom: 100px;
  margin-top: 100px;
}

.text-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 70vh;
  background: rgb(247, 247, 247);
  border: 4px solid;
  border-image: linear-gradient(to right, rgb(119, 0, 255), rgb(255, 128, 0)) 1;
}
</style>
