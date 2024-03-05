<template>
    <v-app-bar app color="darkblue" :elevation="elevation" fixed  class="nav-bar">
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
        <a href="#">Fiche de Renseignement</a>
        <a href="#">Contact</a>
      </div>
    </v-app-bar>
    <div class="background-container">  
      <div class="gradient-overlay"></div> 
      <div class="image-text" style="font-size: 23px;">
      <h1>Rejoignez-Nous!</h1>
    </div>
   </div>
   <br/>
  </template>
  
  <script>
  export default {
    data() {
      return {
        elevation: 0, 
        isNavVisible: true,
        lastScrollPosition: 0,
      };
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    unmounted() {
      window.removeEventListener('scroll', this.handleScroll);
    },
  
    methods: {
      handleScroll() {
        const currentScrollPosition = window.pageYOffset;
        const imageSectionHeight = 400;
        const navBar = document.querySelector('.nav-bar');
        const imageSectionEnd = imageSectionHeight;
        if (currentScrollPosition < imageSectionEnd) {
        const opacity = currentScrollPosition / imageSectionEnd;
        navBar.style.backgroundColor = `rgba(0, 30, 140, ${opacity})`;
      } 
      },
    },
  };
  </script>
  
  <style scoped>
  .title {
    color: white;
  }
  .background-container {
    background-image: url("@/assets/contact.jpg"); /* Replace 'your-image.jpg' with the path to your image */
    background-size: cover;
    background-position: center;
    position: relative;
    width:100%;
    height: 400px;
    }
    .gradient-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(122, 6, 130, 0.73), rgba(9, 80, 120, 0.7)); /* Adjust gradient colors and opacity */
  }
    .image-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(238, 236, 236); /* Adjust text color */
  }
  .navigation {
    display:flex;
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
  