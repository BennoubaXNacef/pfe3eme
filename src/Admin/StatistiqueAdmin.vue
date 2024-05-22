<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Statistiques</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            Form Data Statistics
            <v-spacer></v-spacer>
            <v-select
              v-model="formDataSortBy"
              :items="formDataSortOptions"
              label="Sort By"
            ></v-select>
          </v-card-title>
          <v-card-text>
            <BarChart
              :chartData="formDataChartData"
              :chartOptions="chartOptions"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            Connect Request Statistics
            <v-spacer></v-spacer>
            <v-select
              v-model="connectRequestSortBy"
              :items="connectRequestSortOptions"
              label="Sort By"
            ></v-select>
          </v-card-title>
          <v-card-text>
            <PieChart
              :chartData="connectRequestChartData"
              :chartOptions="chartOptions"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="stat-card">
          <v-card-title class="stat-card-title">
            Total Form Submissions
          </v-card-title>
          <v-card-text class="stat-card-text">{{
            formDataStats.total
          }}</v-card-text>
          <v-card-subtitle class="stat-card-subtitle"
            >Updated now</v-card-subtitle
          >
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="stat-card">
          <v-card-title class="stat-card-title">
            Accepted Form Submissions
          </v-card-title>
          <v-card-text class="stat-card-text">{{
            formDataStats.accepted
          }}</v-card-text>
          <v-card-subtitle class="stat-card-subtitle"
            >Updated now</v-card-subtitle
          >
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="stat-card">
          <v-card-title class="stat-card-title">
            Refused Form Submissions
          </v-card-title>
          <v-card-text class="stat-card-text">{{
            formDataStats.refused
          }}</v-card-text>
          <v-card-subtitle class="stat-card-subtitle"
            >Updated now</v-card-subtitle
          >
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="stat-card">
          <v-card-title class="stat-card-title">
            Total Connect Requests
          </v-card-title>
          <v-card-text class="stat-card-text">{{
            connectRequestStats.total
          }}</v-card-text>
          <v-card-subtitle class="stat-card-subtitle"
            >Updated now</v-card-subtitle
          >
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="stat-card">
          <v-card-title class="stat-card-title">
            Accepted Connect Requests
          </v-card-title>
          <v-card-text class="stat-card-text">{{
            connectRequestStats.accepted
          }}</v-card-text>
          <v-card-subtitle class="stat-card-subtitle"
            >Updated now</v-card-subtitle
          >
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="stat-card">
          <v-card-title class="stat-card-title">
            Refused Connect Requests
          </v-card-title>
          <v-card-text class="stat-card-text">{{
            connectRequestStats.refused
          }}</v-card-text>
          <v-card-subtitle class="stat-card-subtitle"
            >Updated now</v-card-subtitle
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import BarChart from "@/components/BarChart.vue";
import PieChart from "@/components/PieChart.vue";

export default {
  name: "StatistiqueAdmin",
  components: {
    BarChart,
    PieChart,
  },
  data() {
    return {
      formDataStats: [],
      connectRequestStats: [],
      formDataSortBy: "total",
      connectRequestSortBy: "total",
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      formDataSortOptions: [
        "total",
        "accepted",
        "refused",
        "gender",
        "nomEncadrant",
        "sujet",
      ],
      connectRequestSortOptions: ["total", "accepted", "refused"],
    };
  },
  computed: {
    formDataChartData() {
      const sortedData = this.getSortedData(
        this.formDataStats,
        this.formDataSortBy
      );
      return {
        labels: ["Total", "Accepted", "Refused"],
        datasets: [
          {
            label: "Form Data",
            backgroundColor: ["#42A5F5", "#66BB6A", "#FF7043"],
            data: sortedData,
          },
        ],
      };
    },
    connectRequestChartData() {
      const sortedData = this.getSortedData(
        this.connectRequestStats,
        this.connectRequestSortBy
      );
      return {
        labels: ["Total", "Accepted", "Refused"],
        datasets: [
          {
            label: "Connect Requests",
            backgroundColor: ["#42A5F5", "#66BB6A", "#FF7043"],
            data: sortedData,
          },
        ],
      };
    },
  },
  async created() {
    await this.fetchFormDataStats();
    await this.fetchConnectRequestStats();
  },
  methods: {
    async fetchFormDataStats() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/statistics/form-data"
        );
        this.formDataStats = response.data;
      } catch (error) {
        console.error("Error fetching form data statistics:", error);
      }
    },
    async fetchConnectRequestStats() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/statistics/connect-requests"
        );
        this.connectRequestStats = response.data;
      } catch (error) {
        console.error("Error fetching connect request statistics:", error);
      }
    },
    getSortedData(data, sortBy) {
      let sorted = [];
      if (sortBy === "total")
        sorted = [data.total, data.accepted, data.refused];
      else if (sortBy === "accepted")
        sorted = [data.accepted, data.total, data.refused];
      else if (sortBy === "refused")
        sorted = [data.refused, data.total, data.accepted];
      else if (sortBy === "gender") sorted = data.gender;
      else if (sortBy === "nomEncadrant") sorted = data.nomEncadrant;
      else if (sortBy === "sujet") sorted = data.sujet;
      return sorted;
    },
  },
};
</script>

<style scoped>
.stat-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
}

.stat-card-title {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
}

.stat-icon {
  margin-right: 10px;
}

.stat-card-text {
  font-size: 32px;
  font-weight: 700;
}

.stat-card-subtitle {
  font-size: 14px;
  color: gray;
}
</style>
