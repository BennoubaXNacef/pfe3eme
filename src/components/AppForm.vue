<template>
  <div>
    <h1>Fiche de Renseignement</h1>

    <form @submit.prevent="submitForm">
      <label for="fullName">Nom & Prénom:</label>
      <input v-model="formData.fullName" type="text" id="fullName" required />

      <label for="idNumber">N° CIN / Passeport:</label>
      <input v-model="formData.idNumber" type="text" id="idNumber" required />

      <!-- Add other form fields as needed -->

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        fullName: "",
        idNumber: "",
        // Add other form fields here
      },
    };
  },
  methods: {
    submitForm() {
      // Handle form submission logic here
      console.log("Form Data:", this.formData);
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
