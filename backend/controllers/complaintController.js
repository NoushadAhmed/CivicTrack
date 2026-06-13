const Complaint = require("../models/Complaint");

const createComplaint = async (req, res) => {
    console.log(req.file);
    try {

        const {
            title,
            description,
            category,
            location
        } = req.body;

        const complaint = await Complaint.create({
            title,
            description,
            category,
            location,
            citizen: req.user._id
        });

        res.status(201).json({
            success: true,
            complaint
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const getAllComplaints = async (req, res) => {
    try {

        const complaints = await Complaint.find()
            .populate("citizen", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: complaints.length,
            complaints
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const getComplaintById = async (req, res) => {
    try {

        const complaint = await Complaint.findById(req.params.id)
            .populate("citizen", "name email");

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        res.status(200).json({
            success: true,
            complaint
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const updateComplaintStatus = async (req, res) => {
    try {

        const { status } = req.body;

        const complaint = await Complaint.findById(
            req.params.id
        );

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        complaint.status = status;

        await complaint.save();

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            complaint
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const deleteComplaint = async (req, res) => {
    try {

        const complaint = await Complaint.findById(
            req.params.id
        );

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        await complaint.deleteOne();

        res.status(200).json({
            success: true,
            message: "Complaint deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const getComplaintStats = async (req, res) => {
    try {

        const totalComplaints =
            await Complaint.countDocuments();

        const pending =
            await Complaint.countDocuments({
                status: "Pending"
            });

        const inProgress =
            await Complaint.countDocuments({
                status: "In Progress"
            });

        const resolved =
            await Complaint.countDocuments({
                status: "Resolved"
            });

        res.status(200).json({
            success: true,
            totalComplaints,
            pending,
            inProgress,
            resolved
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const assignOfficer = async (req, res) => {

    try {

        const { officerId } = req.body;

        const complaint =
            await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        complaint.assignedOfficer = officerId;

        await complaint.save();

        res.status(200).json({
            success: true,
            message: "Officer assigned successfully",
            complaint
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
const getAssignedComplaints = async (req, res) => {
    try {

        const complaints = await Complaint.find({
            assignedOfficer: req.user._id
        })
        .populate("citizen", "name email");

        res.status(200).json({
            success: true,
            count: complaints.length,
            complaints
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
module.exports = {
    createComplaint,
    getAllComplaints,
    getComplaintById,
    updateComplaintStatus,
    deleteComplaint,
    getComplaintStats,
    assignOfficer,
    getAssignedComplaints
};