const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const User = require("../models/User");

// GET /api/users?role=officer|citizen|admin
router.get("/", protect, authorize("admin"), async (req, res) => {
    try {
        const filter = req.query.role ? { role: req.query.role } : {};
        const users = await User.find(filter).select("-password").sort({ createdAt: -1 });
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

module.exports = router;
