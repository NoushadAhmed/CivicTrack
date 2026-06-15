const express = require("express");
const router = express.Router();

const passport = require("passport");
const jwt = require("jsonwebtoken");

const protect = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser,
    getProfile,
} = require("../controllers/authController");

// Normal Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

// Google Login
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

// Google Callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
    }),
    async (req, res) => {
        try {
            const token = jwt.sign(
                {
                    id: req.user._id,
                    role: req.user.role,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d",
                }
            );

            res.redirect(
                `https://https://civic-track-k6dodxiku-noushadahmeds-projects.vercel.app/?token=${encodeURIComponent(token)}`
            );
        } catch (error) {
            console.error(error);
            res.status(500).send("OAuth Login Failed");
        }
    }
);

module.exports = router;