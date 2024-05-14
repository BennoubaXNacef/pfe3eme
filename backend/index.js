const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/pfe3eme", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Counter schema to maintain sequential IDs
const CounterSchema = new mongoose.Schema({
  _id: String,
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.model("Counter", CounterSchema);

// Form data schema
const FormDataSchema = new mongoose.Schema({
  lineId: Number,
  Nom: String,
  Prénom: String,
  email: String,
  institut: String,
  diplome: String,
  specialite: String,
  startDate: Date,
  endDate: Date,
  tel: Number,
  lieuStage: String,
  typeStage: String,
  idNumber: Number,
  refH: String,
  jours: Number,
  mois: Number,
  TFP: String,
  genre: String,
  nationalite: String,
  diracceuil: String,
  typecontrat: String,
  avis: String,
  nomEncadrant: String,
  telEncardrant: Number,
  datedemande: Date,
  dateattestation: Date,
  sujet: String,
  nomrespo: String,
  telrespo: Number,
  Mailrespo: String,
  etat: { type: String, default: "en attente" }, // Default state is "en attente"
});

// Ensure a sequential lineId is assigned before saving a FormData document
FormDataSchema.pre("save", function (next) {
  var doc = this;
  Counter.findByIdAndUpdate(
    { _id: "lineId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
    .then((counter) => {
      doc.lineId = counter.seq; // Set lineId as the counter value
      next();
    })
    .catch((error) => {
      next(error);
    });
});

const FormData = mongoose.model("FormData", FormDataSchema);

// Routes
app.get("/api/data", (req, res) => {
  const etatFilter = req.query.etat ? { etat: req.query.etat } : {};
  FormData.find(etatFilter)
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({ message: "Error retrieving data", error: err })
    );
});

// Update state endpoint
// Update data endpoint
app.post("/api/data/:lineId", (req, res) => {
  const updates = req.body; // This contains all the fields that need to be updated
  const lineId = parseInt(req.params.lineId); // Ensure it's a number if lineId is stored as a number
  console.log("Received update for lineId:", lineId, "with data:", updates);

  FormData.findOneAndUpdate(
    { lineId: lineId },
    { $set: updates },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .json({ message: "No document found with lineId: " + lineId });
      }
      res
        .status(200)
        .json({ message: "Data updated successfully", data: data });
    })
    .catch((error) => {
      console.error("Failed to update data:", error);
      res.status(500).json({ message: "Error updating data", error: error });
    });
});

// Route to update state
// Route to update state
// Update 'etat' for a specific entry identified by 'lineId'
app.post("/api/data/update-etat/:lineId", (req, res) => {
  const { etat } = req.body; // Get the new 'etat' from request body
  const { lineId } = req.params; // Get the 'lineId' from URL parameters

  FormData.findOneAndUpdate(
    { lineId: lineId },
    { $set: { etat: etat } },
    { new: true }
  )
    .then((updatedDocument) => {
      if (!updatedDocument) {
        return res.status(404).send("Document with specified ID not found.");
      }
      res
        .status(200)
        .json({ message: "Etat updated successfully", data: updatedDocument });
    })
    .catch((error) =>
      res.status(500).json({ message: "Error updating etat", error })
    );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
console.log("Serving files from:", path.join(__dirname, "public"));
console.log(path.join(__dirname, "public")); // This should output the absolute path to your 'public' folder
