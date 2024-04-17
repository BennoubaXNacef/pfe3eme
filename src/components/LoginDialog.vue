<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="text-center font-weight-bold">Welcome to Tunisie Telecom</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field v-model="email" label="Email" required outlined></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            outlined
            required
            hide-details
          ></v-text-field>
          <v-row class="mt-2">
          <v-col>
            <a href="#" @click="forgotPassword" class="forgot-link">Forgot your password?</a>
          </v-col>
        </v-row>
          <v-btn type="submit" color="primary" block>Login</v-btn>
          <v-row class="mt-4">
            <v-col cols="12">
              <h4 class="text-center">Or</h4>
            </v-col>
          </v-row>
        <v-btn type="submit" color="primary" block>Connect with your Google Account</v-btn>
        </v-form>     
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      email: '',
      password: '',
      showPassword: false,
    };
  },
  methods: {
    login() {
      // Add your login logic here
      console.log('Logging in with:', this.email, this.password);
      // Once logged in successfully, you can close the dialog or redirect the user
      this.dialog = false;
    },
    forgotPassword() {
      // Add logic for forgot password functionality
      console.log('Forgot password clicked');
    },
    switchToGoogle() {
      // Add logic to switch to Google login
      console.log('Switch to Google clicked');
    },
  },
};
</script>

<style scoped>
.v-card-title {
  padding: 20px 0; /* Adjust padding as needed */
}
.v-text-field {
  border-radius: 20px; /* Rounded border */
  border-width: 2px; /* Border width */
  margin-bottom: 10px; /* Spacing between fields */
}
.forgot-link,
.google-link {
  color: #1976d2; /* Link color */
  cursor: pointer; /* Show pointer cursor */
  text-decoration: underline; /* Underline link text */
  display: inline-block; /* Ensure it's clickable */
  margin-bottom: 10px; /* Spacing between links */
}
.v-btn {
  border-radius: 20px; /* Rounded border */
  width: 100%; /* Full width */
}
</style>
