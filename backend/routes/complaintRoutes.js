const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    createComplaint,
    getAllComplaints,
    getComplaintById,
    updateComplaintStatus,
    deleteComplaint,
    getComplaintStats,
    assignOfficer,
    getAssignedComplaints
} = require("../controllers/complaintController");

// Create complaint
router.post(
    "/",
    protect,
    upload.single("image"),
    createComplaint
);

// Get all complaints
router.get("/", protect, getAllComplaints);

// Static routes MUST come before /:id
router.get(
    "/stats",
    protect,
    authorize("admin"),
    getComplaintStats
);

router.get(
    "/officer/assigned",
    protect,
    authorize("officer"),
    getAssignedComplaints
);

// Get complaint by ID
router.get("/:id", protect, getComplaintById);

// Update complaint status
router.put(
    "/:id/status",
    protect,
    authorize("officer", "admin"),
    updateComplaintStatus
);

// Delete complaint
router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteComplaint
);

router.put(
    "/:id/assign",
    protect,
    authorize("admin"),
    assignOfficer
);
module.exports = router;