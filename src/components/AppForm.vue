<template>
  <br />
  <br />
  <br />
  <v-container>
    <h1>Fiche de renseignement</h1>

    <!-- Form -->
    <v-form v-model="valid" @submit.prevent="submitForm" ref="form">
      <!-- Nom & Prénom -->
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="lastname"
            :counter="10"
            :rules="nameRules"
            label="Nom"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="firstname"
            :counter="10"
            :rules="nameRules"
            label="Prénom"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            hide-details
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- N° CIN / Passeport -->
      <v-text-field
        v-model="formData.idNumber"
        label="N° CIN / Passeport"
        :rules="idNumberRules"
        required
      ></v-text-field>

      <!-- Institut -->
      <v-text-field v-model="formData.institut" label="Institut"></v-text-field>

      <!-- Diplôme visé -->
      <v-text-field
        v-model="formData.diplome"
        label="Diplôme visé"
      ></v-text-field>

      <!-- Spécialité -->
      <v-text-field
        v-model="formData.specialite"
        label="Spécialité"
      ></v-text-field>

      <!-- Date début & date fin de stage -->
      <v-row>
        <v-col cols="6">
          <v-date-picker
            v-model="formData.startDate"
            label="Date début de stage"
            required
          ></v-date-picker>
        </v-col>
        <v-col cols="6">
          <v-date-picker
            v-model="formData.endDate"
            label="Date fin de stage"
            required
          ></v-date-picker>
        </v-col>
      </v-row>

      <!-- Tél du stagiaire -->
      <v-text-field
        v-model="formData.tel"
        label="Tél du stagiaire"
        :rules="idNumberRules2"
        required
      ></v-text-field>

      <!-- Lieu de stage -->
      <v-select
        v-model="formData.lieuStage"
        :items="lieuStageOptions"
        label="Lieu de stage"
        required
      ></v-select>

      <!-- Type de stage -->
      <v-select
        v-model="formData.typeStage"
        :items="typeStageOptions"
        label="Type de stage"
        required
      ></v-select>

      <!-- Submit Button -->
      <v-row class="justify-end">
      <v-btn type="submit">Submit</v-btn>
    </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        fullName: "",
        idNumber: "",
        institut: "",
        diplome: "",
        specialite: "",
        startDate: null,
        endDate: null,
        tel: "",
        lieuStage: null,
        typeStage: null,
      },
      lieuStageOptions: [
        "DR Gabès",
        "Division Réseaux & SI",
        "Espace TT Gabès",
        "Espace TT Gabès Sud",
        "Espace TT El Hamma",
        "Espace TT Mareth",
        "Espace TT Metouia",
        "Subdivision des Affaires Commerciales",
        "Subdivision des Affaires Financières",
        "Subdivision de Déploiement des Réseaux",
        "Subdivision Planification et Ingénierie",
        "Subdivision Qualité et Optimisation Mobile",
        "ROC",
        "Unité CORE",
        "Unité Transport",
        "Unité Radio",
        "UGA",
        "ULS Gabès",
        "ULS Zrig",
      ],
      typeStageOptions: [
        "Initiation",
        "Perfectionnement",
        "Ouvrier",
        "Technicien",
        "Ingénieur",
        "Alternance",
      ],
    };
  },
  computed: {
    idNumberRules() {
      return [
        value => !!value || "Ce champ est requis",
        value => /^([0-9]{8})$/.test(value) || "Le format du N°CIN/Passeport est invalide",
      ];
    },
    idNumberRules2() {
      return [
        value => !!value || "Ce champ est requis",
        value => /^([0-9]{9})$/.test(value) || "Le N°Telephone est invalide",
      ];
    },
  },
  methods: {
    submitForm() {
      // Check if the form is valid
      if (this.$refs.form.validate()) {
        // Form is valid, proceed with form submission
        // Handle form submission logic here
        console.log("Form Data:", this.formData);

        // Automatically record the date of the request
        this.formData.requestDate = new Date().toISOString();

        // Example: Submit form data to a backend server
        // axios.post('/submit-form', this.formData)
        //   .then(response => {
        //     console.log("Form submitted successfully!", response.data);
        //   })
        //   .catch(error => {
        //     console.error("Error submitting form:", error);
        //   });
      } else {
        // Form is not valid, display error message or take appropriate action
        console.log("Form is not valid. Please fill in all required fields.");
      }
    },
  },
};
</script>

<style scoped>
.justify-end {
  justify-content: flex-end;
}
/* Add scoped styles here */
</style>
