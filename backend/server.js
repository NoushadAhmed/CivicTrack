const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");

dotenv.config();

const connectDB = require("./config/db");
const passport = require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

// Middleware
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://civic-track-k6dodxiku-noushadahmeds-projects.vercel.app",
        ],
        credentials: true,
    })
);

app.use(express.json());

app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Community Complaint Management API Running");
});

// Server
const PORT = process.env.PORT || 5000;

app.get("/env-test", (req, res) => {
    res.json({
        googleClientId: !!process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
        jwtSecret: !!process.env.JWT_SECRET,
        mongoUri: !!process.env.MONGO_URI,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
