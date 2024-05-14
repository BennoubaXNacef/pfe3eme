<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card flat>
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
            class="elevation-1"
            item-key="id"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.lineId }}</td>
                <td>{{ item.Nom }}</td>
                <td>{{ item.Prénom }}</td>
                <td>{{ item.idNumber }}</td>
                <td>{{ item.institut }}</td>
                <td>{{ item.diplome }}</td>
                <td>{{ item.specialite }}</td>
                <td>{{ item.refH }}</td>
                <td>{{ item.startDate }}</td>
                <td>{{ item.endDate }}</td>
                <td>{{ item.jours }}</td>
                <td>{{ item.mois }}</td>
                <td>{{ item.TFP }}</td>
                <td>{{ item.tel }}</td>
                <td>{{ item.genre }}</td>
                <td>{{ item.nationalite }}</td>
                <td>{{ item.diracceuil }}</td>
                <td>{{ item.lieuStage }}</td>
                <td>{{ item.typeStage }}</td>
                <td>{{ item.typecontrat }}</td>
                <td>{{ item.avis }}</td>
                <td>{{ item.nomEncadrant }}</td>
                <td>{{ item.telEncadrant }}</td>
                <td>{{ item.datedemande }}</td>
                <td>{{ item.dateattestation }}</td>
                <td>{{ item.sujet }}</td>
                <td>{{ item.nomrespo }}</td>
                <td>{{ item.telrespo }}</td>
                <td>{{ item.Mailrespo }}</td>
                <td>{{ item.actions }}</td>
                <td>
                  <v-btn icon @click="openEditDialog(item)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="downloadExcel(item)">
                    <v-icon>mdi-download</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
          <v-dialog v-model="editDialog" max-width="600px">
            <v-card>
              <v-card-title>
                Edit Details
                <v-spacer></v-spacer>
                <v-btn icon @click="editDialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="selectedItem.Nom"
                        label="Nom"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.Prénom"
                        label="Prénom"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.idNumber"
                        label="Numéro d'ID"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.institut"
                        label="Institut"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.diplome"
                        label="Diplôme"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.specialite"
                        label="Spécialité"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.refH"
                        label="Réf.de.l'habitat"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.startDate"
                        label="Début de Stage"
                        type="date"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.endDate"
                        label="Fin de Stage"
                        type="date"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.jours"
                        label="NBREDE jours"
                        type="number"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.mois"
                        label="NBREDE mois"
                        type="number"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.TFP"
                        label="ESTIMATION TFP"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.tel"
                        label="Tél"
                        type="tel"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.genre"
                        label="GENRE"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.nationalite"
                        label="NATIONALITE"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.diracceuil"
                        label="DIRECTION ACCEUIL"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.lieuStage"
                        label="Lieu de Stage"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.typeStage"
                        label="Type de Stage"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.typecontrat"
                        label="Type de contrat"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.avis"
                        label="avis"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.nomEncadrant"
                        label="Nom encadrant"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.telEncadrant"
                        label="tel encadrant"
                        type="tel"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.datedemande"
                        label="Date de demande"
                        type="date"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.dateattestation"
                        label="Date D'attestation"
                        type="date"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.sujet"
                        label="Sujet"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.nomrespo"
                        label="NOM de responsable de stage"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.telrespo"
                        label="Tel de responsable de stage"
                        type="tel"
                      ></v-text-field>
                      <v-text-field
                        v-model="selectedItem.Mailrespo"
                        label="Mailrespo"
                        type="email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="editDialog = false"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="saveChanges"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      search: "",
      editDialog: false,
      selectedItem: {
        startDate: null,
        endDate: null,
        jours: 0,
        mois: 0,
      },
      stagiaires: [],
      headers: [
        { text: "ID", value: "lineId" },
        { text: "Nom", value: "Nom" },
        { text: "Prénom", value: "Prénom" },
        { text: "Numéro d'ID", value: "idNumber" },
        { text: "Institut", value: "institut" },
        { text: "Diplôme", value: "diplome" },
        { text: "Spécialité", value: "specialite" },
        { text: "Réf.de.l'habitat", value: "refH" },
        { text: "Début de Stage", value: "startDate" },
        { text: "Fin de Stage", value: "endDate" },
        { text: "NBREDE jours", value: "jours" },
        { text: "NBREDE mois", value: "mois" },
        { text: "ESTIMATION TFP", value: "TFP" },
        { text: "Tél", value: "tel" },
        { text: "GENRE", value: "genre" },
        { text: "NATIONALITE", value: "nationalite" },
        { text: "DIRECTION ACCEUIL", value: "diracceuil" },
        { text: "Lieu de Stage", value: "lieuStage" },
        { text: "Type de Stage", value: "typeStage" },
        { text: "Type de contrat", value: "typecontrat" },
        { text: "avis", value: "avis" },
        { text: "Nom encadrant", value: "nomEncadrant" },
        { text: "tel encadrant", value: "telEncadrant" },
        { text: "Date de demande", value: "datedemande", width: "200px" },
        {
          text: "Date D'attestation",
          value: "dateattestation",
        },
        { text: "Sujet", value: "sujet" },
        {
          text: "NOM de responsable de stage",
          value: "nomrespo",
        },
        {
          text: "Tel de responsable de stage ",
          value: "telrespo",
        },
        { text: "Mailrespo", value: "mailrespo" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    jours() {
      if (!this.selectedItem.startDate || !this.selectedItem.endDate) return 0;
      const start = new Date(this.selectedItem.startDate);
      const end = new Date(this.selectedItem.endDate);
      return (end - start) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    },
    mois() {
      if (!this.selectedItem.startDate || !this.selectedItem.endDate) return 0;
      const start = new Date(this.selectedItem.startDate);
      const end = new Date(this.selectedItem.endDate);
      return (
        (end.getFullYear() - start.getFullYear()) * 12 +
        end.getMonth() -
        start.getMonth()
      ); // Calculate full months difference
    },
  },
  mounted() {
    this.fetchStagiaires();
  },
  methods: {
    fetchStagiaires() {
      axios
        .get("http://localhost:3000/api/data")
        .then((response) => {
          this.stagiaires = response.data.filter(
            (item) => item.etat === "affecté"
          );
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    updateData(item) {
      console.log("Updating data for item with lineId:", item.lineId);
      axios
        .put(`http://localhost:3000/api/data/${item.lineId}`, item)
        .then((response) => {
          console.log("Update successful:", response.data);
          this.fetchStagiaires(); // Refetch the data to refresh the table
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    },
    openEditDialog(item) {
      this.selectedItem = { ...item };
      this.editDialog = true;
    },
    saveChanges() {
      this.updateData(this.selectedItem);
      this.editDialog = false; // Close the dialog after save
    },
    downloadExcel(item) {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet([item]);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Details");
      XLSX.writeFile(workbook, `${item.Nom}_${item.Prénom}.xlsx`);
    },
  },
};
</script>
<style scoped>
.header-style th {
  background-color: #3f51b5;
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 12px 10px;
}
.download-button {
  font-size: 10px;
  padding: 2px 5px;
}
.custom-small-button {
  padding: 4px 8px;
  min-width: 0;
  font-size: 0.75rem;
}
</style>
