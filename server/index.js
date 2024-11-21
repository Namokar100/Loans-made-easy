require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const bankLoginRoutes = require("./routes/bankLoginRoutes");
const loanRoutes = require("./routes/loanApplicationRoutes");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Cloudinary Configuration
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bank", bankLoginRoutes);
app.use("/api/loan", loanRoutes);

// Default route for undefined paths
app.use((req, res) => res.status(404).send("Route not found"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));