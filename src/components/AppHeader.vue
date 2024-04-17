<template>
<v-app-bar app color="darkblue" :elevation="elevation" fixed  >
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
      <a href="#">Contact</a>
      <a href="#" @click="showLoginDialog">Connexion</a>
    </div>
  </v-app-bar>
  <LoginDialog v-model="loginDialogVisible" />
</template>
  <script>
  import LoginDialog from '@/components/LoginDialog.vue';
  export default {
    components: {
    LoginDialog
  },
    data() {
      return {
        elevation: 0, 
        isNavVisible: true,
        lastScrollPosition: 0,
        loginDialogVisible: false,
    }
    },
    mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    showLoginDialog() {
      this.loginDialogVisible = true;
    },
    handleScroll() {
      const currentScrollPosition = window.pageYOffset;
      const imageSectionHeight = 400;
      const navBar = document.querySelector('.nav-bar');
      const imageSectionEnd = imageSectionHeight;
      if (currentScrollPosition < imageSectionEnd) {
      const opacity = currentScrollPosition / imageSectionEnd;
      navBar.style.backgroundColor = `rgba(0, 30, 140, ${opacity})`;
    } 
    },},
};
</script>
<style scoped>
.title {
  color: white;
}
.navigation {
  display: flex;
}

.navigation a {
  color: #c7bdfb; 
  text-decoration: none;
  margin-left: 20px; 
}

.navigation a:hover {
  text-decoration: underline;
}
</style>