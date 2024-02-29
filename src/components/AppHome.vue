<template>
  <br />
  <br />
  <div class="bg-container section">
    <v-carousel>
      <v-carousel-item
        :src="require('@/assets/home bg.jpg')"
        cover
      ></v-carousel-item>

      <v-carousel-item :src="require('@/assets/2.jpg')" cover></v-carousel-item>

      <v-carousel-item :src="require('@/assets/3.jpg')" cover></v-carousel-item>
    </v-carousel>
  </div>

  <div class="section">
    <v-container class="text-container">
      Explorez les opportunités diverses de Tunisie Telecom sur notre
      application web. Que vous soyez intéressé par l'Initiation, le
      Perfectionnement, le poste d'Ouvrier, de Technicien, d'Ingénieur, ou
      encore par nos programmes en Alternance, nous proposons une gamme complète
      d'opportunités pour votre développement professionnel. Trouvez la voie qui
      correspond à votre parcours et atteignez vos objectifs avec nous
    </v-container>
  </div>
  <div class="section">
    <h1 class="boldtext">NOS VALEURS</h1>
    <br />
    <v-row>
      <v-col cols="12" md="6">
        <v-card
          class="mx-auto custom-bg"
          max-width="600"
          hover
          color="transparent"
        >
          <v-card-item>
            <v-card-title class="custom-padding">FAIRE SIMPLE</v-card-title>
          </v-card-item>

          <v-card-text class="custom-card-text"
            >Réfléchir et agir de manière à simplifier les processus et agir
            plus rapidement et efficacement.C’est le moyen de s’adapter à cet
            environnement complexe poussé par l’accélération du digital et
            adopter une posture Agile.Faire simple veut dire aussi éliminer
            toute tâche inutile et sans valeur ajoutée.
          </v-card-text>
        </v-card>
        <br />
        <v-card
          class="mx-auto custom-bg"
          max-width="600"
          hover
          color="transparent"
        >
          <v-card-item>
            <v-card-title class="custom-padding">RESPONSABILITÉ</v-card-title>
          </v-card-item>

          <v-card-text class="custom-card-text">
            La capacité à percevoir les frontières : Qu’est-ce qui m’appartient
            vs qu’est ce qui appartient à l’autre. Ne pas faire supporter aux
            autres les conséquences de ses décisionsLa capacité à percevoir les
            relations de cause/effet : Assumer les conséquences de ses actes.
            Apprendre des ses erreurs.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card
          class="mx-auto custom-bg"
          max-width="600"
          hover
          color="transparent"
        >
          <v-card-item>
            <v-card-title class="custom-padding">ESPRIT D’ÉQUIPE</v-card-title>
          </v-card-item>

          <v-card-text class="custom-card-text">
            La capacité à travailler efficacement au sein d’un groupe tout en
            gardant un fort sentiment d’appartenance et de loyauté vis à vis de
            l’entreprise.Une personne qui a un fort esprit d’équipe, passe
            l’intérêt collectif avant son intérêt personnel car elle est
            consciente que son évolution professionnelle dépend du succès de
            l’entreprise.
          </v-card-text>
        </v-card>
        <br />
        <v-card
          class="mx-auto custom-bg"
          max-width="600"
          hover
          color="transparent"
        >
          <v-card-item>
            <v-card-title class="custom-padding">ENGAGEMENT</v-card-title>
          </v-card-item>

          <v-card-text class="custom-card-text">
            La faculté d’une personne à donner le meilleur d’elle-même pour
            donner satisfaction dans son travail.L’assiduité dans son travail et
            un haut niveau de fiabilité dans l’atteinte des objectifs tant sur
            plan quantitatif que qualitatifLes délais sont toujours respectés et
            on est capable de faire preuve d’initiative pour dépasser les
            imprévus et obstacles.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <div class="section">
    <h1 class="boldtext">Rejoignez-nous!</h1>
    <br />

    <div class="overlay-container">
      <!-- Background image overlay -->
      <div class="overlay-image"></div>

      <!-- Text content -->
      <v-container class="text-containeer">
        <h1 class="boldtext">Voir Formulaire</h1>
        <!-- Add other text content here -->
      </v-container>

      <!-- Button at the bottom -->
      <div class="button-container">
        <v-btn class="btn" @click="goToForm">Voir Maintenant !</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppForm",
  methods: {
    goToForm() {
      this.$router.push({ name: "Form" });
    },
  },
};
</script>

<style scoped>
.section {
  margin-bottom: 30px; /* Adjust the margin as needed for visual separation */
}
.btn {
  color: white;
  background-color: #001e8c;
}
.overlay-container {
  position: relative;
  height: 100vh; /* Adjust height based on your design */
}

.overlay-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/bg.jpg"); /* Add your image path */
  background-size: cover;
  background-position: center;
  opacity: 0.5; /* Adjust opacity as needed */
}

.text-containeer {
  position: absolute;
  top: 50%;
  left: 71%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1; /* Ensure text is above the overlay image */
}

.button-container {
  position: absolute;
  bottom: 40%; /* Adjust as needed */
  left: 71%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 1; /* Ensure button is above the overlay image */
}

.boldtext {
  font-size: 50px;
  font-weight: bold;
  opacity: 0.8;
}
.text-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 30vh;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: rgb(194, 241, 255);
  border-radius: 40px;
  color: #001e8c;
}

.custom-bg {
  background: linear-gradient(
    to right,
    rgb(84, 60, 241),
    deepskyblue
  ); /* Add your gradient colors here */
  color: white; /* Optional: Set text color to white for better visibility */
  border-radius: 40px;
}
.custom-padding {
  padding-top: 20px;
  color: #ffffff;
}
.custom-card-text {
  margin-top: -5px; /* Adjust the value for less space */
  color: #ffffff !important;
  opacity: 0.8;
}
.boldtext {
  text-align: center;
  color: #001e8c;
  font-size: 50px;
  font-weight: bold;
  opacity: 0.8;
}
</style>
