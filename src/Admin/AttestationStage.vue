<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="stagiaire in stagiaires"
        :key="stagiaire.lineId"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="pa-3" elevation="2">
          <v-card-title>
            {{ stagiaire.Nom }} {{ stagiaire.Prénom }}
          </v-card-title>
          <v-card-subtitle> ID: {{ stagiaire.idNumber }} </v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" @click="downloadAttestation(stagiaire)">
              Download Attestation
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import JSZipUtils from "jszip-utils";

export default {
  data() {
    return {
      stagiaires: [],
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
          this.stagiaires = response.data.filter(
            (stagiaire) => stagiaire.etat === "affecté"
          );
        })
        .catch((error) => {
          console.error("Error fetching stagiaires:", error);
        });
    },
    downloadAttestation(stagiaire) {
      JSZipUtils.getBinaryContent(
        "http://localhost:3000/uploads/Modele.docx",
        (error, content) => {
          if (error) {
            console.error("Error loading the DOCX template:", error);
            return;
          }

          const zip = new PizZip(content);
          const doc = new Docxtemplater().loadZip(zip);
          doc.setData({
            nom: stagiaire.Nom,
            prenom: stagiaire.Prénom,
            idNumber: stagiaire.idNumber,
            institut: stagiaire.institut,
            typeStage: stagiaire.typeStage,
            startDate: stagiaire.startDate,
            endDate: stagiaire.endDate,
            dateattestation: stagiaire.dateattestation,
          });

          try {
            doc.render();
          } catch (error) {
            const e = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              properties: error.properties,
            };
            console.error(JSON.stringify({ error: e }));
            throw error;
          }

          const out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          saveAs(out, `Attestation_${stagiaire.Nom}_${stagiaire.Prénom}.docx`);
        }
      );
    },
  },
};
</script>
