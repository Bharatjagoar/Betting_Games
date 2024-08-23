
const mongoose = require("mongoose");

const lotteryBetSchema = new mongoose.Schema(
  {
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    Ammount:{
        type:Number,
        default:100000,
        min:0
    }
  },{timestamps: true}
);


module.exports = mongoose.model("MannualAmmount", lotteryBetSchema);