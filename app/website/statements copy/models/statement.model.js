const mongoose = require("mongoose");

const statementSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.ObjectId,
    },
    UserType: {
        type: String,
        enum: ["client", "admin"],
    },
    Description: {
      type: String,
    },
    PrevBalance: {
      type: Number,
    },
    Credit: {
      type: Number,
      default:0,
    },
    Debit: {
      type: Number,
      default:0
    },
    Commission: {
      type: Number,
      default:0
    },
    Balance: {
      type: Number
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Statement2", statementSchema);
