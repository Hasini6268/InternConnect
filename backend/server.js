const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");


// Load environment variables
dotenv.config();


const app = express();


// ======================
// Middleware
// ======================

app.use(cors());

app.use(express.json());


// ======================
// Serve Frontend Files
// ======================

app.use(express.static(path.join(__dirname, "../frontend")));


// ======================
// Routes
// ======================

const authRoutes = require("./routes/authRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");


// API Routes

app.use("/api/auth", authRoutes);

app.use("/api/internships", internshipRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/users", userRoutes);


// ======================
// Default Route
// ======================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "../frontend/index.html")
    );

});


// ======================
// MongoDB Connection
// ======================

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected Successfully");

})

.catch((error) => {

    console.log("MongoDB Connection Error:", error);

});


// ======================
// Server Port
// ======================

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(`InternConnect Server running on port ${PORT}`);

});