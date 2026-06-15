const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["citizen", "officer", "admin"],
            default: "citizen"
        },

        googleId: {
            type: String,
        },

        password: {
            type: String,
            default: null,
        },


    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);