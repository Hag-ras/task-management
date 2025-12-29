// backend/server.js

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors"); // <-- Added
require("dotenv").config();

// Connect to Database
connectDB();

const app = express();

// Use CORS Middleware
app.use(cors()); // <-- Added

// Init Middleware
// This allows us to accept JSON data in the body
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
