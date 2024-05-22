<template>
  <v-container fluid class="pdf-library">
    <div class="title-container">
      <h1 class="main-title">Telecom Library</h1>
    </div>

    <div
      class="category-container"
      v-for="category in categories"
      :key="category.id"
    >
      <h2 class="subtitle">{{ category.name }}</h2>
      <div class="carousel-container">
        <v-btn icon @click="prev(category.id)" class="carousel-button left">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-slide-group
          :ref="'slideGroup' + category.id"
          v-model="category.currentSlide"
        >
          <v-slide-item
            v-for="pdf in category.pdfs"
            :key="pdf.id"
            class="slide-item"
          >
            <v-card class="mx-2 large-card" outlined>
              <v-img :src="pdf.image" height="400px" class="card-image"></v-img>
              <v-card-title class="card-title">{{ pdf.title }}</v-card-title>
              <v-card-actions class="card-actions">
                <v-btn color="primary" @click="downloadPdf(pdf.url)">
                  Download
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-slide-item>
        </v-slide-group>
        <v-btn icon @click="next(category.id)" class="carousel-button right">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "PdfList",
  data() {
    return {
      categories: [
        {
          id: 1,
          name: "SUJETS PFE",
          currentSlide: 0,
          pdfs: [
            {
              id: 1,
              title: "TT-PFE-BOOK 2022-2023 VF",
              url: "/uploads/TT-PFE-BOOK 2022-2023 VF.pdf",
              image: "/pfe20222023.jpg",
            },
            {
              id: 2,
              title: "TT-PFE-BOOK 2022-2023 VF",
              url: "/uploads/TT-PFE-BOOK 2022-2023 VF.pdf",
              image: "/pfe20222023.jpg",
            },
            {
              id: 3,
              title: "TT-PFE-BOOK 2022-2023 VF",
              url: "/uploads/TT-PFE-BOOK 2022-2023 VF.pdf",
              image: "/pfe20222023.jpg",
            },
          ],
        },
        {
          id: 2,
          name: "OFFRES D'EMPLOIS",
          currentSlide: 0,
          pdfs: [
            {
              id: 4,
              title: "PDF 2",
              url: "path/to/pdf2.pdf",
              image: "/images (1).jpg",
            },
            {
              id: 5,
              title: "PDF 5",
              url: "path/to/pdf5.pdf",
              image: "/images (2).jpg",
            },
            {
              id: 6,
              title: "PDF 8",
              url: "path/to/pdf8.pdf",
              image: "/images (3).jpg",
            },
          ],
        },
        {
          id: 3,
          name: "TT-BOOKs",
          currentSlide: 0,
          pdfs: [
            {
              id: 7,
              title: "PDF 3",
              url: "path/to/pdf3.pdf",
              image: "/images (4).jpg",
            },
            {
              id: 8,
              title: "PDF 6",
              url: "path/to/pdf6.pdf",
              image: "/images (5).jpg",
            },
            {
              id: 9,
              title: "PDF 9",
              url: "path/to/pdf9.pdf",
              image: "path/to/image9.jpg",
            },
          ],
        },
      ],
    };
  },
  methods: {
    downloadPdf(url) {
      const link = document.createElement("a");
      link.href = url;
      link.download = url.substring(url.lastIndexOf("/") + 1);
      link.click();
    },
    prev(categoryId) {
      const slideGroup = this.$refs[`slideGroup${categoryId}`][0];
      if (slideGroup) {
        slideGroup.$el.scrollBy({
          top: 0,
          left: -slideGroup.$el.clientWidth,
          behavior: "smooth",
        });
      }
    },
    next(categoryId) {
      const slideGroup = this.$refs[`slideGroup${categoryId}`][0];
      if (slideGroup) {
        slideGroup.$el.scrollBy({
          top: 0,
          left: slideGroup.$el.clientWidth,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>

<style scoped>
body {
  background-color: #ffffff; /* White background */
}

.pdf-library {
  background-color: #ffffff; /* White background */
  padding: 20px;
  margin-top: 64px; /* Add margin-top to push content below the header */
  color: #333333; /* Dark gray text color */
  position: relative; /* Ensure it can contain absolutely positioned elements */
}

.title-container {
  text-align: center;
  margin-bottom: 20px;
}

.main-title {
  font-size: 48px;
  font-weight: bold;
  color: rgba(18, 2, 126, 0.73); /* Main color */
  margin: 0;
}

.subtitle {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #666666; /* Medium gray for subtitles */
}

.category-container {
  margin-bottom: 40px; /* Space between categories */
}

.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
}

.v-slide-group {
  flex: 1;
  margin: 0 50px; /* Adjust margin for button spacing */
}

.slide-item {
  display: flex;
  justify-content: center;
}

.large-card {
  width: 400px;
  transition: transform 0.3s ease-in-out;
  background-color: #f9f9f9; /* Light gray for card background */
  color: #333333; /* Dark gray text color */
}

.large-card:hover {
  transform: scale(1.05);
}

.card-image {
  object-fit: cover;
}

.card-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #666666; /* Medium gray for card titles */
}

.card-actions {
  justify-content: center;
}

.v-btn {
  color: #ffffff !important;
  background-color: rgba(18, 2, 126, 0.73) !important; /* Main color */
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background-color: rgba(18, 2, 126, 0.73); /* Main color */
  color: white;
}

.carousel-button.left {
  left: 0;
}

.carousel-button.right {
  right: 0;
}
</style>
