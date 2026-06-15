const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");

// Load Environment Variables FIRST
dotenv.config();

const connectDB = require("./config/db");
const passport = require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

// Connect Database
//connectDB();

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

// Session Middleware
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport Middleware
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Community Complaint Management API Running");
});

// Environment Test Route (optional)
app.get("/env-test", (req, res) => {
  res.json({
    googleClientId: !!process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    jwtSecret: !!process.env.JWT_SECRET,
    mongoUri: !!process.env.MONGO_URI,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

startServer();