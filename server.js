
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

let complaints = [];
let nextId = 1;

// Open the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Save a new complaint
app.post("/complaints", (req, res) => {
  const { studentName, roomNumber, category, description } = req.body;

  if (!studentName || !roomNumber || !category || !description) {
    return res.status(400).send("Please fill in all fields.");
  }

  complaints.push({
    id: nextId++,
    studentName,
    roomNumber,
    category,
    description,
    status: "Pending",
    date: new Date().toLocaleDateString()
  });

  res.redirect("/");
});

// Show complaints as JSON data
app.get("/api/complaints", (req, res) => {
  res.json(complaints);
});

// Update complaint status
app.post("/complaints/:id/status", (req, res) => {
  const complaint = complaints.find(
    item => item.id === Number(req.params.id)
  );

  if (!complaint) {
    return res.status(404).send("Complaint not found.");
  }

  const allowedStatuses = ["Pending", "In Progress", "Resolved"];

  if (!allowedStatuses.includes(req.body.status)) {
    return res.status(400).send("Invalid status.");
  }

  complaint.status = req.body.status;
  res.redirect("/");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Hostel Complaint System running at http://localhost:${PORT}`);
});
