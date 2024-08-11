const mongoose = require("mongoose");

const lotteryBetSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clients",
      required: true,
    },
    betType: {
      type: String,
      enum: ["single", "jodi", "teen"],
      required: true,
    },
    Bettingnumber:{
        type:Number
    },
    ammount:{
        type:Number
    }
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("lotterybetModel", lotteryBetSchema);