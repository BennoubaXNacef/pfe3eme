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

// Create a simple mongoose schema
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
