const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    googleId: {
      type: String,
      default: null,
    },

    password: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["citizen", "officer", "admin"],
      default: "citizen",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);