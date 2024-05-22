<template>
  <v-container fluid class="login-container">
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-5">
          <v-card-title class="headline">{{ formTitle }}</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
              <template v-if="!showRequestForm">
                <v-text-field
                  v-model="username"
                  label="Username"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>
                <v-btn type="submit" color="primary" block>Login</v-btn>
                <v-alert v-if="error" type="error" dismissible>
                  {{ error }}
                </v-alert>
              </template>
              <template v-else>
                <v-text-field
                  v-model="requestData.name"
                  label="Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="requestData.surname"
                  label="Surname"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="requestData.phone"
                  label="Phone Number"
                  type="tel"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="requestData.idNumber"
                  label="ID Number"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="requestData.requestUsername"
                  label="Username"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="requestData.requestPassword"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>
                <v-btn type="submit" color="primary" block>Send Request</v-btn>
                <v-btn text block @click="toggleForm">Back to Login</v-btn>
                <v-alert v-if="requestError" type="error" dismissible>
                  {{ requestError }}
                </v-alert>
                <v-alert v-if="requestSuccess" type="success" dismissible>
                  {{ requestSuccess }}
                </v-alert>
              </template>
            </v-form>
            <v-card-actions>
              <v-btn text @click="toggleForm" block>Subscription</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios"; // Import the default Axios instance

export default {
  name: "ConnectAdmin",
  data() {
    return {
      username: "",
      password: "",
      error: null,
      showRequestForm: false,
      requestData: {
        name: "",
        surname: "",
        phone: "",
        idNumber: "",
        requestUsername: "",
        requestPassword: "",
      },
      requestError: null,
      requestSuccess: null,
    };
  },
  computed: {
    formTitle() {
      return this.showRequestForm ? "Send Request" : "Admin Login";
    },
  },
  methods: {
    toggleForm() {
      this.showRequestForm = !this.showRequestForm;
      this.clearMessages();
    },
    clearMessages() {
      this.error = null;
      this.requestError = null;
      this.requestSuccess = null;
    },
    async handleSubmit() {
      if (this.showRequestForm) {
        this.sendRequest();
      } else {
        this.login();
      }
    },
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/admin/login",
          {
            username: this.username,
            password: this.password,
          }
        );
        if (response.data.message === "Login successful") {
          this.$router.push("/admin");
        } else {
          this.error = "Invalid username or password, or request not accepted";
        }
      } catch (error) {
        this.error = "An error occurred during login";
        console.error("Login error:", error);
      }
    },
    async sendRequest() {
      try {
        console.log("Sending request data", this.requestData);
        const response = await axios.post(
          "http://localhost:3000/api/admin/request",
          this.requestData
        );
        console.log("Request response", response);
        if (response.data.success) {
          this.requestSuccess = "Request sent successfully";
          this.requestError = null;
          setTimeout(() => {
            this.toggleForm();
            this.requestData = {
              name: "",
              surname: "",
              phone: "",
              idNumber: "",
              requestUsername: "",
              requestPassword: "",
            };
          }, 2000);
        } else {
          this.requestError = "Failed to send request";
          this.requestSuccess = null;
        }
      } catch (error) {
        this.requestError = "An error occurred while sending the request";
        this.requestSuccess = null;
        console.error("Request error:", error);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  background-color: #001e8c; /* Blue background */
  height: 100vh; /* Full screen height */
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-card {
  width: 100%;
  max-width: 400px;
}

.headline {
  text-align: center;
  width: 100%;
  color: #ffffff; /* White text color */
}

.v-text-field {
  background-color: #ffffff; /* White background for input fields */
  border-radius: 4px;
}

.v-btn {
  background-color: #001e8c !important; /* Blue button */
  color: #ffffff !important; /* White text color */
}

.v-alert {
  margin-top: 20px;
}
</style>
