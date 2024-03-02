<template>
  <br />
  <br />
  <br />
  <v-container>
    <v-row class="justify-center">
      <h1>Fiche de renseignement</h1>
    </v-row>

    <v-sheet class="mx-auto" width="1200">
      <!-- Form -->
      <v-form
        lazy-validation
        v-model="valid"
        @submit.prevent="submitForm"
        ref="form"
      >
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="formData.Nom"
              label="Nom"
              :rules="lastNameRules"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="formData.Prénom"
              label="Prénom"
              :rules="firstNameRules"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="formData.email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <br />
        <!-- N° CIN / Passeport -->
        <v-text-field
          v-model="idNumber"
          label="N° CIN / Passeport"
          :rules="idNumberRules"
          required
        ></v-text-field>

        <!-- Institut -->
        <v-text-field
          v-model="formData.institut"
          label="Institut"
        ></v-text-field>

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
        <v-row v-if="submissionStatus === 'success'" class="justify-end">
          <v-alert type="success">Form submitted successfully!</v-alert>
        </v-row>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      idNumber: "",
      submissionStatus: null,
      valid: false,
      formData: {
        Nom: "",
        Prénom: "",
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
      firstNameRules: [
        (value) => {
          if (/[^0-9]/.test(value)) return true;

          return "First name can not contain digits.";
        },
      ],
      lastNameRules: [
        (value) => {
          if (/[^0-9]/.test(value)) return true;

          return "Last name can not contain digits.";
        },
      ],
    };
  },

  computed: {
    emailRules() {
      return [
        (value) => !!value || "Ce champ est requis",
        // Add other email validation rules as needed
      ];
    },
    idNumberRules() {
      return [
        (value) => !!value || "Ce champ est requis",
        (value) =>
          /^([0-9]{8})$/.test(value) ||
          "Le format du N°CIN/Passeport est invalide",
      ];
    },
    idNumberRules2() {
      return [
        (value) => {
          console.log("Tel value:", value);
          console.log("Validation result:", !!value);
          return !!value || "Ce champ est requis";
        },
        (value) => /^([0-9]{8})$/.test(value) || "Le N°Telephone est invalide",
      ];
    },

    // Add this line
  },

  created() {
    // Set up Axios for HTTP requests
    this.$http = axios;
  },

  methods: {
    async submitForm() {
      // Check if the form is valid
      if (this.$refs.form.validate()) {
        // Form is valid, proceed with form submission
        try {
          // Use Vue.js HTTP library or Axios to make a POST request to your backend API
          await this.$http.post("http://localhost:3000/api/data", {
            ...this.formData,
            idNumber: this.idNumber,
          });
          this.submissionStatus = "success";

          // Optionally, reset form data after successful submission
          this.formData = {
            Nom: "",
            Prénom: "",
            idNumber: "",
            institut: "",
            diplome: "",
            specialite: "",
            startDate: null,
            endDate: null,
            tel: "",
            lieuStage: null,
            typeStage: null,
          };

          console.log("Form submitted successfully!");
        } catch (error) {
          console.error("Error submitting form:", error);
          this.submissionStatus = "error";
        }
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
.justify-center {
  justify-content: center;
}

/* Add scoped styles here */
</style>
