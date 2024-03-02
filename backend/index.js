const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// MongoDB connection
const mongoDBConnectionURL = "mongodb://127.0.0.1:27017/pfe3eme";

mongoose.connect(mongoDBConnectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Create a mongoose schema for your form data
const formDataSchema = new mongoose.Schema({
  Nom: String,
  Prénom: String,
  idNumber: {
    type: Number,
    required: true,
    validate: {
      validator: (value) =>
        Number.isInteger(value) && value.toString().length === 8,
      message: "idNumber must be an 8-digit integer",
    },
  },
  institut: String,
  diplome: String,
  specialite: String,
  startDate: Date,
  endDate: Date,
  tel: {
    type: Number,
    required: true,
    validate: {
      validator: (value) =>
        Number.isInteger(value) && value.toString().length === 8,
      message: "tel must be an 8-digit integer",
    },
  },
  lieuStage: String,
  typeStage: String,
});

// Create a Mongoose model based on the schema
const FormData = mongoose.model("FormData", formDataSchema);

// Express route to handle form submissions
app.post("/api/data", async (req, res) => {
  try {
    // Create a new instance of FormData model with request body
    const newFormData = new FormData(req.body);

    // Save the form data to MongoDB
    await newFormData.save();

    res.status(201).json({ message: "Form data saved successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
