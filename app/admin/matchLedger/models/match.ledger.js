const mongoose = require("mongoose");
const moment = require("moment");

const matchSchema = new mongoose.Schema(
  {
    Date: {
      type: String,
      default: moment().format("L"),
    },
    Title: {
      type: String,
    },
    Credit: {
      type: Number,
      default: 0,
    },
    Debit: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);
