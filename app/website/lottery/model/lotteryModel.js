const mongoose = require("mongoose");

const lotteryGameSchema = new mongoose.Schema({
  gameName: {
    type: String,
    default: "Kuber",
  },
  firstNumber: {
    type: Number
    // default: "NULL",
  },
  secondNumber: {
    type: Number
    // default: "NULL",
  },
  thirdNumber: {
    type: Number
    // default: "NULL",
  },
  dateToday: {
    type: String
    // required: true,
  },
  day:{
    type:String 
  }
});

let Lotterymodel = mongoose.model("lotteryModel", lotteryGameSchema);





module.exports = Lotterymodel