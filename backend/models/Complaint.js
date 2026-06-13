const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Pending", "In Progress", "Resolved"],
        default: "Pending"
    },

    citizen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    assignedOfficer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},
image: {
    type: String
},

},
{
    timestamps: true
}
);


module.exports = mongoose.model(
    "Complaint",
    complaintSchema
);