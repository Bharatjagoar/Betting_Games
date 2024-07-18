const mongoose = require("mongoose");

const AdminLoginSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    Country: {
      type: String,
    },
    Region: {
      type: String,
    },
    City: {
      type: String,
    },
    ISP: {
      type: String,
    },
    IPAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Login", AdminLoginSchema);
