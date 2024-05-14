<template>
  <v-app-bar app color="darkblue" :elevation="elevation" fixed class="nav-bar">
    <v-img
      :src="require('@/assets/logott.png')"
      alt="Logo"
      max-height="40"
      max-width="40"
      class="logo"
    ></v-img>
    <v-app-bar-title class="title">Tunisie Telecom</v-app-bar-title>
    <div class="navigation">
      <a href="#">Accueil</a>
      <a href="#">Contact</a>
      <a href="#" @click.prevent="showLoginDialog">Connexion</a>
    </div>
  </v-app-bar>
  <LoginDialog v-model="loginDialogVisible" />
  <div class="background-container">
    <div class="gradient-overlay"></div>
    <div class="image-text" style="font-size: 23px">
      <h1>Rejoignez-Nous!</h1>
    </div>
  </div>
  <br />
  <v-container>
    <v-row class="justify-center">
      <h1 class="fiche-title">Fiche De Renseignement</h1>
    </v-row>
    <br />
    <br />
    <v-sheet class="mx-auto" width="1000">
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
        <!-- N° CIN / Passeport -->
        <v-text-field
          v-model="formData.idNumber"
          label="N° CIN / Passeport"
          :rules="idNumberRules"
          required
        ></v-text-field>

        <!-- Institut -->
        <v-text-field
          v-model="formData.institut"
          label="Institut"
          :rules="institutRules"
          required
        ></v-text-field>

        <!-- Diplôme visé -->
        <v-text-field
          v-model="formData.diplome"
          label="Diplôme visé"
          :rules="diplomeRules"
          required
        ></v-text-field>

        <!-- Spécialité -->
        <v-text-field
          v-model="formData.specialite"
          label="Spécialité"
          :rules="specialiteRules"
          required
        ></v-text-field>

        <!-- Date début & date fin de stage -->
        <v-row>
          <v-col cols="6">
            <v-date-picker
              v-model="formData.startDate"
              format="yyyy-MM-dd"
              no-title
              :picker-type="'Debut de stage'"
            ></v-date-picker>
          </v-col>
          <v-col cols="6">
            <v-date-picker
              v-model="formData.endDate"
              format="yyyy-MM-dd"
              no-title
              :picker-type="'Fin de stage'"
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
          :rules="placeRules"
          required
        ></v-select>

        <!-- Type de stage -->
        <v-select
          v-model="formData.typeStage"
          :items="typeStageOptions"
          label="Type de stage"
          :rules="TypestageRules"
          required
        ></v-select>

        <!-- Text area for motivation -->
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="formData.motivation"
              label="Why did you choose our company for your internship?"
              rows="3"
              auto-grow
              outlined
              required
            ></v-textarea>
          </v-col>
        </v-row>
        <br />
        <!-- Submit Button -->
        <v-row class="justify-center">
          <v-btn
            type="submit"
            style="background-color: darkblue; color: white"
            width="500"
            >Postuler</v-btn
          >
        </v-row>
        <v-row v-if="submissionStatus === 'success'" class="justify-end">
          <v-alert type="success">Form submitted successfully!</v-alert>
        </v-row>
        <br />
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
import axios from "axios";
import LoginDialog from "@/components/LoginDialog.vue"; // Adjust the path based on your project structure
export default {
  components: {
    LoginDialog,
  },
  data() {
    return {
      elevation: 0,
      isNavVisible: true,
      lastScrollPosition: 0,
      loginDialogVisible: false,
      idNumber: "",
      submissionStatus: null,
      valid: false,
      formData: {
        Nom: "",
        Prénom: "",
        email: "",
        idNumber: "", // Correctly initializing here as a string
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
        (value) => !!value || "Ce champ est requis",
        (value) =>
          /^[a-zA-Z\s]*$/.test(value) ||
          "Le nom ne doit contenir que des lettres et des espaces",
      ],
      lastNameRules: [
        (value) => !!value || "Ce champ est requis",
        (value) =>
          /^[a-zA-Z\s]*$/.test(value) ||
          "Le nom ne doit contenir que des lettres et des espaces",
      ],
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
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
    emailRules() {
      return [
        (value) => !!value || "Ce champ est requis",
        (value) => /.+@.+\..+/.test(value) || "E-mail invalide",
      ];
    },
    diplomeRules() {
      return [
        (value) => !!value || "Ce champ est requis",
        (value) =>
          /^[a-zA-Z\s]*$/.test(value) ||
          "Le diplome ne doit contenir que des lettres et des espaces",
      ];
    },
    institutRules() {
      return [
        (value) => !!value || "Ce champ est requis",
        (value) =>
          /^[a-zA-Z\s]*$/.test(value) ||
          "l'institut ne doit contenir que des lettres et des espaces",
      ];
    },
    specialiteRules() {
      return [
        (value) => !!value || "Ce champ est requis",
        (value) =>
          /^[a-zA-Z\s]*$/.test(value) ||
          "La spécialité ne doit contenir que des lettres et des espaces",
      ];
    },
    placeRules() {
      return [(value) => !!value || "Ce champ est requis"];
    },
    TypestageRules() {
      return [(value) => !!value || "Ce champ est requis"];
    },
  },
  created() {
    this.$http = axios;
  },

  methods: {
    showLoginDialog() {
      this.loginDialogVisible = true;
    },
    handleScroll() {
      const currentScrollPosition = window.pageYOffset;
      const imageSectionHeight = 400;
      const navBar = document.querySelector(".nav-bar");
      if (currentScrollPosition < imageSectionHeight) {
        const opacity = currentScrollPosition / imageSectionHeight;
        navBar.style.backgroundColor = `rgba(0, 30, 140, ${opacity})`;
      }
    },
    formatDate(date) {
      return date ? new Date(date).toISOString().split("T")[0] : null;
    },
    async submitForm() {
      if (this.$refs.form.validate()) {
        // Explicitly convert idNumber to a Number
        this.formData.idNumber = Number(this.formData.idNumber);
        console.log("Converted idNumber to Number:", this.formData.idNumber);

        try {
          const response = await axios.post(
            "http://localhost:3000/api/data",
            this.formData
          );
          console.log("Submission Successful", response.data);
          this.submissionStatus = "success";
          this.$router.push("/success");
        } catch (error) {
          console.error("Error submitting form:", error);
          this.submissionStatus = "error";
        }
      }
    },

    resetForm() {
      // Reset the formData to initial state
      this.formData = {
        Nom: "",
        Prénom: "",
        email: "",
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
    },
  },
};
</script>

<style scoped>
.title {
  color: white;
}
.justify-center {
  justify-content: center;
}
.background-container {
  background-image: url("@/assets/contact.jpg"); /* Replace 'your-image.jpg' with the path to your image */
  background-size: cover;
  background-position: center;
  position: relative;
  width: 100%;
  height: 400px;
}
.gradient-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(122, 6, 130, 0.73),
    rgba(9, 80, 120, 0.7)
  );
}
.image-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(238, 236, 236); /* Adjust text color */
}
.fiche-title {
  font-weight: bold;
  color: darkblue;
}
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
/* Add scoped styles here */
</style>
