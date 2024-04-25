const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/pfe3eme", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Define the FormData schema
const formDataSchema = new mongoose.Schema({
  Nom: String,
  Prénom: String,
  email: String,
  idNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{8}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid 8-digit ID number!`,
    },
    required: [true, "User id number required"],
  },
  institut: String,
  diplome: String,
  specialite: String,
  startDate: Date,
  endDate: Date,
  tel: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{8}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid 8-digit telephone number!`,
    },
    required: [true, "Telephone number required"],
  },
  lieuStage: String,
  typeStage: String,
});

const FormData = mongoose.model("FormData", formDataSchema);

// Route to handle form submissions
app.post("/api/data", async (req, res) => {
  try {
    const formData = new FormData(req.body);
    await formData.save();
    res.status(201).json({ message: "Form data saved successfully" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
