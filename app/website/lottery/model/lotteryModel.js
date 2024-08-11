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
  startTime: {
    type: String
    // required: true,
  },
});

let Lotterymodel = mongoose.model("lotteryModel", lotteryGameSchema);

const instantiate = async ()=>{
    try {
        const found = await Lotterymodel.findOne()
        if(!found){
          const createdDOC = await Lotterymodel.create({})
          // console.log("create new one",createdDOC)

        }else{
          // console.log("found bhbhbh",found)
        }
    } catch (error) {
      console.log(error)
    }
}

instantiate()


module.exports = Lotterymodel