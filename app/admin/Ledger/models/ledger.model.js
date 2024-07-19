const mongoose = require("mongoose");

const LedgerSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    wonby: {
      type: String,
      required: true,
    },
    won: {
      type: Number,
      required: true,
    },
    lost: {
      type: Number,
    },
    hisab: {
      type: Number,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "userType",
      },
      userType: {
        type: String,
        required: true,
        enum: ["client", "Admin"],
      },
  },
 { timestamps: true }
);

module.exports = mongoose.model("Ledger", LedgerSchema);
