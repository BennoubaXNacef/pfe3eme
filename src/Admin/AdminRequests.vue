<template>
  <v-container>
    <v-row class="justify-center">
      <h1 class="title">Admin Requests</h1>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="requests"
          class="elevation-1"
          :items-per-page="5"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              color="green"
              @click="acceptRequest(item._id)"
              :disabled="item.status === 'accepted'"
            >
              Accept
            </v-btn>
            <v-btn
              color="red"
              @click="refuseRequest(item._id)"
              :disabled="item.status === 'refused'"
            >
              Refuse
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminRequests",
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Surname", value: "surname" },
        { text: "Phone", value: "phone" },
        { text: "ID Number", value: "idNumber" },
        { text: "Username", value: "requestUsername" },
        { text: "Status", value: "status" }, // Add status column
        { text: "Actions", value: "actions", sortable: false },
      ],
      requests: [],
    };
  },
  created() {
    this.fetchRequests();
  },
  methods: {
    async fetchRequests() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/requests"
        );
        this.requests = response.data;
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    },
    async acceptRequest(id) {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/admin/request/${id}/accept`
        );
        if (response.data.success) {
          this.fetchRequests(); // Refresh the request list
        } else {
          console.error("Failed to accept request:", response.data.message);
        }
      } catch (error) {
        console.error("Error accepting request:", error);
      }
    },
    async refuseRequest(id) {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/admin/request/${id}/refuse`
        );
        if (response.data.success) {
          this.fetchRequests(); // Refresh the request list
        } else {
          console.error("Failed to refuse request:", response.data.message);
        }
      } catch (error) {
        console.error("Error refusing request:", error);
      }
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
  color: darkblue;
}
</style>
