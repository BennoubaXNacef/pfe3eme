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

// ConnectRequest schema for /api/admin/request route
const ConnectRequestSchema = new mongoose.Schema({
  name: String,
  surname: String,
  phone: String,
  idNumber: String,
  requestUsername: String,
  requestPassword: String,
  status: { type: String, default: "pending" },
});

const ConnectRequest = mongoose.model("ConnectRequest", ConnectRequestSchema);

// Routes
app.get("/api/data", (req, res) => {
  const etatFilter = req.query.etat ? { etat: req.query.etat } : {};
  FormData.find(etatFilter)
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({ message: "Error retrieving data", error: err })
    );
});

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

// Route to handle /connect POST requests
app.post("/connect", async (req, res) => {
  const connectRequestData = req.body;
  try {
    const connectRequest = new ConnectRequest(connectRequestData);
    await connectRequest.save();
    res.json({ success: true, message: "Request sent successfully" });
  } catch (error) {
    console.error("Connect request error:", error);
    res.status(500).json({ success: false, message: "Failed to send request" });
  }
});

// Route to handle /api/admin/request POST requests
app.post("/api/admin/request", async (req, res) => {
  const requestData = req.body;
  console.log("Received request data:", requestData); // Log the received data
  try {
    const request = new ConnectRequest(requestData);
    await request.save();
    res.json({ success: true, message: "Request sent successfully" });
  } catch (error) {
    console.error("Request error:", error);
    res.status(500).json({ success: false, message: "Failed to send request" });
  }
});

// Route to get all admin requests
app.get("/api/admin/requests", async (req, res) => {
  try {
    const requests = await ConnectRequest.find();
    res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch requests" });
  }
});

// Route to accept an admin request
app.post("/api/admin/request/:id/accept", async (req, res) => {
  try {
    const request = await ConnectRequest.findById(req.params.id);
    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }
    request.status = "accepted";
    await request.save();
    res.json({ success: true, message: "Request accepted" });
  } catch (error) {
    console.error("Error accepting request:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to accept request" });
  }
});

// Route to refuse an admin request
app.post("/api/admin/request/:id/refuse", async (req, res) => {
  try {
    const request = await ConnectRequest.findById(req.params.id);
    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }
    request.status = "refused";
    await request.save();
    res.json({ success: true, message: "Request refused" });
  } catch (error) {
    console.error("Error refusing request:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to refuse request" });
  }
});

// Login endpoint
// Login endpoint
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await ConnectRequest.findOne({
      requestUsername: username,
      requestPassword: password,
      status: "accepted",
    });
    if (user) {
      res.json({ message: "Login successful", status: user.status });
    } else {
      res.json({
        message: "Invalid username or password or user not accepted",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

// Route to handle form data submissions
app.post("/api/data", async (req, res) => {
  const formData = req.body;
  try {
    const newFormData = new FormData(formData);
    await newFormData.save();
    res.json({ success: true, message: "Form data submitted successfully" });
  } catch (error) {
    console.error("Form data submission error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to submit form data" });
  }
});
// Add these routes at the end of your file

// Route to get form data statistics
// Additional statistics endpoints
// Endpoint to get form data statistics
app.get("/api/statistics/form-data", async (req, res) => {
  try {
    const total = await FormData.countDocuments();
    const accepted = await FormData.countDocuments({ etat: "affecté" });
    const refused = await FormData.countDocuments({ etat: "refusé" });

    res.json({ total, accepted, refused });
  } catch (error) {
    console.error("Error fetching form data statistics:", error);
    res.status(500).json({ message: "Failed to fetch form data statistics" });
  }
});

// Endpoint to get connect request statistics
app.get("/api/statistics/connect-requests", async (req, res) => {
  try {
    const total = await ConnectRequest.countDocuments();
    const accepted = await ConnectRequest.countDocuments({
      status: "accepted",
    });
    const refused = await ConnectRequest.countDocuments({ status: "refused" });

    res.json({ total, accepted, refused });
  } catch (error) {
    console.error("Error fetching connect request statistics:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch connect request statistics" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
console.log("Serving files from:", path.join(__dirname, "public"));
console.log(path.join(__dirname, "public")); // This should output the absolute path to your 'public' folder
