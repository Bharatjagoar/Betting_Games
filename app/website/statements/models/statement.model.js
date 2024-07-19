const mongoose = require("mongoose");

const statementSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client",
    },
    Description: {
      type: String,
    },
    PrevBalance: {
      type: Number,
    },
    Credit: {
      type: Number,
    },
    Debit: {
      type: Number,
    },
    Commission: {
      type: Number,
    },
    Balance: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Statement", statementSchema);
