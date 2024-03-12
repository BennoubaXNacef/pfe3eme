// index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.port || 3000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/pfe3eme", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})  
mongoose.connection.on('connected', () => {
  console.log('Connecté à MongoDB');
});
mongoose.connection.on('disconnected', () => {
  console.log('Déconnecté de MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('Erreur de connexion à MongoDB :', err);
});

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'malak_ghannouchi@ieee.org',
    pass: 'gh22122002'
  }
});
const sendWelcomeEmail = (email, firstName) => { // Changed 'username' to 'firstName'
  const mailOptions = {
    from: 'malak_ghannouchi@ieee.org',
    to: email,
    subject: 'Bienvenue !',
    html: `<p>Bonjour ${firstName},</p><p> // Changed 'username' to 'firstName'
    Bonjour,
    
    Nous vous remercions vivement d'avoir postulé chez TT Gabès et de l'intérêt que vous portez à notre entreprise.
    
    Votre candidature sera minutieusement examinée, et nous vous contacterons si votre profil correspond aux critères requis pour le poste.
    
    Si vous ne recevez pas de nouvelles de notre part dans les trois semaines à venir, nous vous prions de considérer que votre candidature n'a pas été retenue cette fois-ci.
    
    Votre profil sera conservé dans notre base de données, sauf indication contraire de votre part. Nous n'hésiterons pas à vous contacter si une opportunité correspondant à votre profil se présente à l'avenir.
    
    Cordialement,</p><p>A bientôt !</p>`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Erreur lors de l\'envoi de l\'e-mail :', err);
    } else {
      console.log('E-mail envoyé avec succès :', info.response);
    }
  });
};
 // Importez votre modèle d'utilisateur MongoDB (utilisant Mongoose)
const User = require('./models/User');
// Route POST pour l'inscription d'un nouvel utilisateur
app.post('/signup', async (req, res) => {
  try {
    // Récupérez les informations de l'utilisateur depuis le corps de la demande
    const { email, formData } = req.body;

    // Enregistrez l'utilisateur dans la base de données MongoDB
    const newUser = new User({ 
      email, 
      Nom: formData['Nom'], 
      Prénom: formData['Prénom'], 
    });
    await newUser.save();

    // Envoyez un e-mail de bienvenue à l'utilisateur
    sendWelcomeEmail(email, formData['Nom']);

    // Répondez avec un message de réussite
    res.status(200).json({ message: 'Utilisateur enregistré avec succès !' });
  } catch (err) {
    console.error('Erreur lors de l\'inscription :', err);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
});

const dataSchema = new mongoose.Schema({
  name: String,
});

const Data = mongoose.model("Data", dataSchema);

// Express route to handle form submissions
app.post("/api/data", async (req, res) => {
  try {
    // Assuming your form sends a field named 'name'
    const newData = new Data({ name: req.body.name });

    // Save the data to MongoDB
    await newData.save();

    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
