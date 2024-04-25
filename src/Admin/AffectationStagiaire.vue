<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Affectation Stagiaire
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="stagiaires"
            :search="search"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      stagiaires: [],
      headers: [
        { text: "Nom", value: "Nom" }, // Ensure these values exactly match the keys in your database documents
        { text: "Prénom", value: "Prénom" },
        { text: "Email", value: "email" }, // This assumes you have an 'email' field; adjust if not
        { text: "Institut", value: "institut" },
      ],
    };
  },
  mounted() {
    this.fetchStagiaires();
  },
  methods: {
    async fetchStagiaires() {
      try {
        const response = await axios.get("http://localhost:3000/api/data");
        this.stagiaires = response.data; // log the response to ensure data structure
        console.log(this.stagiaires);
      } catch (error) {
        console.error("There was an error fetching the stagiaires:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Styling to match the AdminDashboard if necessary */
</style>
