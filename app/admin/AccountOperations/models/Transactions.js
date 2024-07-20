const mongoose = require("mongoose");
const moment = require("moment");

const transactionSchema = new mongoose.Schema(
  {
    Date: {
      type:String,
      default:moment().format('L')
    },
    Operation: {
      type: String,
      required:true
    },
    DoneBy: {
      type: String,
      required:true
    },
    Description: {
      type: String,
      required:true
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model("transaction",transactionSchema)
