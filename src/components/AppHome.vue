<template>
  <div>
    <v-carousel>
      <v-carousel-item
        :src="require('@/assets/home bg.jpg')"
        cover
      ></v-carousel-item>

      <v-carousel-item :src="require('@/assets/2.jpg')" cover></v-carousel-item>

      <v-carousel-item :src="require('@/assets/3.jpg')" cover></v-carousel-item>
    </v-carousel>
    <br />
    <v-container class="text-container">
      Explorez les opportunités diverses de Tunisie Telecom sur notre
      application web. Que vous soyez intéressé par l'Initiation, le
      Perfectionnement, le poste d'Ouvrier, de Technicien, d'Ingénieur, ou
      encore par nos programmes en Alternance, nous proposons une gamme complète
      d'opportunités pour votre développement professionnel. Trouvez la voie qui
      correspond à votre parcours et atteignez vos objectifs avec nous
    </v-container>
    <br />
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
        <br />
      </v-col>
    </v-row>
    <div>
      <v-btn @click="goToForm">Go to Form</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHome",
  methods: {
    goToForm() {
      this.$router.push({ name: "AppForm" });
    },
  },
};
</script>

<style scoped>
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
