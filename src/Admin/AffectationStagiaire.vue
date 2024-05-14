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
            <v-btn v-if="!editMode" @click="toggleEditMode" color="primary"
              >Modify</v-btn
            >
            <v-btn v-if="editMode" @click="applyAllChanges" color="success"
              >Apply</v-btn
            >
            <v-btn v-if="editMode" @click="cancelAllEdits" color="error"
              >Cancel</v-btn
            >
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="stagiaires"
            :search="search"
            class="elevation-1"
            item-key="id"
            hide-default-header
            fixed-header
            height="75vh"
          >
            <template v-slot:top>
              <thead class="header-style">
                <tr>
                  <th
                    v-for="header in headers"
                    :key="header.value"
                    class="text-center"
                    :style="{ width: header.width }"
                  >
                    {{ header.text }}
                  </th>
                </tr>
              </thead>
            </template>
            <template v-slot:item="{ item }">
              <tr>
                <td
                  v-for="header in headers"
                  :key="header.value"
                  :style="{ width: header.width }"
                >
                  <template
                    v-if="
                      editMode &&
                      header.value !== 'etat' &&
                      header.value !== 'actions'
                    "
                  >
                    <v-text-field
                      v-model="item[header.value]"
                      dense
                      solo
                      flat
                      hide-details
                    ></v-text-field>
                  </template>
                  <template
                    v-else-if="
                      header.value !== 'etat' && header.value !== 'actions'
                    "
                  >
                    {{ item[header.value] }}
                  </template>
                  <template v-if="header.value === 'etat'">
                    <v-btn
                      :color="getStatusColor(item.etat)"
                      text
                      class="custom-small-button"
                      @click="updateEtat(item)"
                    >
                      {{ item.etat }}
                    </v-btn>
                  </template>
                  <v-btn
                    v-if="header.value === 'actions'"
                    color="primary"
                    class="download-button"
                    @click="downloadExcel(item)"
                  >
                    Download Excel
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
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
      editMode: false,
      stagiaires: [],
      headers: [
        { text: "ID", value: "lineId", width: "50px" },
        { text: "Nom", value: "Nom", width: "100px" },
        { text: "Prénom", value: "Prénom", width: "100px" },
        { text: "Email", value: "email", width: "100px" },
        { text: "Institut", value: "institut", width: "100px" },
        { text: "Numéro d'ID", value: "idNumber", width: "100px" },
        { text: "Diplôme", value: "diplome", width: "100px" },
        { text: "Spécialité", value: "specialite", width: "100px" },
        { text: "Début de Stage", value: "startDate", width: "150px" },
        { text: "Fin de Stage", value: "endDate", width: "150px" },
        { text: "Tél", value: "tel", width: "110px" },
        { text: "Lieu de Stage", value: "lieuStage", width: "130px" },
        { text: "Type de Stage", value: "typeStage", width: "130px" },
        { text: "Etat", value: "etat", width: "100px" },
        { text: "Actions", value: "actions", sortable: false, width: "150px" },
      ],
    };
  },
  mounted() {
    this.fetchStagiaires();
  },
  methods: {
    fetchStagiaires() {
      axios
        .get("http://localhost:3000/api/data")
        .then((response) => {
          this.stagiaires = response.data.map((item) => ({
            ...item,
            original: { ...item }, // Save original data to revert if needed
            editing: false, // Initial state not in editing
          }));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    updateEtat(item) {
      const newEtat =
        item.etat === "affecté"
          ? "en attente"
          : item.etat === "en attente"
          ? "refusé"
          : "affecté";
      axios
        .post(`http://localhost:3000/api/data/${item.lineId}`, {
          etat: newEtat,
        })
        .then((response) => {
          item.etat = newEtat; // Update locally only on successful server update
          console.log("Update successful", response.data);
        })
        .catch((error) => {
          console.error("Error updating etat:", error);
        });
    },
    async downloadExcel(item) {
      try {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([]);

        // Headers and structure definition
        const headers = [
          ["Fiche d'affectation / Stagiaire"], // Merged title
          [
            "Nom et Prénom",
            "N° C.I.N/Passport",
            "Ecole / Institut / Faculté",
            "Diplôme",
            "Spécialité",
            "Type de Stage",
            "Période de Stage",
            "Tél Stagiaire",
          ],
          [], // Empty row for spacing due to merged cells
          ["Affectation / Service", ""], // Empty string for "Tél Stagiaire"
        ];

        XLSX.utils.sheet_add_aoa(worksheet, headers, { origin: "A1" });

        // Merge cells for title and headers
        worksheet["!merges"] = [
          { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }, // Title
          { s: { r: 3, c: 0 }, e: { r: 3, c: 7 } }, // "Affectation / Service"
          { s: { r: 3, c: 1 }, e: { r: 3, c: 1 } }, // "N° C.I.N/Passport" single cell
          { s: { r: 3, c: 2 }, e: { r: 3, c: 2 } }, // "Ecole / Institut / Faculté" single cell
          { s: { r: 3, c: 3 }, e: { r: 3, c: 3 } }, // "Diplôme" single cell
          { s: { r: 3, c: 4 }, e: { r: 3, c: 4 } }, // "Spécialité" single cell
          { s: { r: 3, c: 5 }, e: { r: 3, c: 5 } }, // "Type de Stage" single cell
          { s: { r: 3, c: 6 }, e: { r: 3, c: 6 } }, // "Période de Stage" single cell
          { s: { r: 3, c: 7 }, e: { r: 3, c: 7 } }, // "Tél Stagiaire" single cell
        ];

        // Inserting "Tél Stagiaire" header in the appropriate position
        worksheet["D3"] = { v: "Tél Stagiaire", t: "s" };

        // Adding an empty row for spacing
        worksheet["!rows"] = [{}, {}, {}, {}];

        // Data row aligned with headers
        const studentData = [
          [
            item.Nom + " " + item.Prénom,
            item.idNumber,
            item.institut,
            item.diplome,
            item.specialite,
            item.typeStage,
            item.startDate + " - " + item.endDate, // Ensuring this is properly formatted
            item.tel,
          ],
          [item.affectationService, ""], // Add empty string for "Tél Stagiaire"
        ];

        // Adding data starting from the correct position
        XLSX.utils.sheet_add_aoa(worksheet, studentData, { origin: "A3" });

        // Adjust column widths
        worksheet["!cols"] = [
          { wch: 30 }, // Nom et Prénom
          { wch: 20 }, // N° C.I.N/Passport
          { wch: 30 }, // Ecole / Institut / Faculté
          { wch: 20 }, // Diplôme
          { wch: 20 }, // Spécialité
          { wch: 20 }, // Type de Stage
          { wch: 40 }, // Période de Stage
          { wch: 20 }, // Tél Stagiaire
        ];

        // Append worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Create a buffer from the workbook
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });

        // Create a Blob from the buffer
        const blob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Trigger the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `fiche_affectation_${item.Nom}_${item.Prénom}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      } catch (error) {
        console.error("Error creating Excel file:", error);
      }
    },
    getStatusColor(etat) {
      switch (etat) {
        case "affecté":
          return "green";
        case "en attente":
          return "yellow";
        case "refusé":
          return "red";
        default:
          return "grey"; // Default color if status is unknown
      }
    },

    applyAllChanges() {
      this.stagiaires.forEach((item) => {
        if (item.editing) {
          // Check if the item is in editing mode
          axios
            .post(`http://localhost:3000/api/data/${item.lineId}`, item)
            .then((response) => {
              console.log("Data saved:", response.data);
              item.editing = false; // Turn off editing mode on successful save
              item.original = { ...item }; // Update the original to the new saved state directly
            })
            .catch((error) => {
              console.error("Error saving data:", error);
            });
        }
      });
      this.editMode = false; // Turn off global edit mode
    },
    cancelAllEdits() {
      this.stagiaires.forEach((item) => {
        if (item.original) {
          Object.assign(item, item.original); // revert changes to original
        }
        item.editing = false; // Ensure all items are no longer in edit mode
      });
      this.editMode = false; // Turn off global edit mode
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
      if (!this.editMode) {
        // Revert all items on canceling edit mode
        this.cancelAllEdits(); // Use the cancelAllEdits method to revert all edits
      } else {
        // Make a deep copy of the items to revert back if needed
        this.stagiaires.forEach((item) => {
          item.original = JSON.parse(JSON.stringify(item));
          item.editing = true; // Set all items to editing mode
        });
      }
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
  font-size: 10px; /* Smaller font size for button text */
  padding: 2px 5px; /* Reduced padding for a smaller button */
}
.custom-small-button {
  padding: 4px 8px; /* Reduce padding */
  min-width: 0; /* Remove minimum width constraints */
  font-size: 0.75rem; /* Optional: Reduce font size */
}
</style>
