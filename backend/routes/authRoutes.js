const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const {
    registerUser,
    loginUser,
    getProfile
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
    }),
    async (req, res) => {

        const token = jwt.sign(
            {
                id: req.user._id,
                role: req.user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.redirect(
            `https://civic-track-k6dodxiku-noushadahmeds-projects.vercel.app/?token=${encodeURIComponent(token)}`
        );
    }
);

module.exports = router;