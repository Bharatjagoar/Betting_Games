const mongoose = require("mongoose")

const RolletNumberOfBets = new mongoose.Schema({
    numberOfbets:{
        type:Number,
        required:true,
        default:0
    },
    winningIndices:{
        type:[Number],
        default:null
    },
    totalChances:{
        type:Number
    }
})

const numberOfbetsRolleteModel = mongoose.model("RolleteNumberOfBets",RolletNumberOfBets)
async function instantiate(){
    const docfindone = await numberOfbetsRolleteModel.findOne({})
    console.log(docfindone)
    if(!docfindone){
        console.log("creating one number of bets model")
        await numberOfbetsRolleteModel.create({})
    }   
}

instantiate()
module.exports = numberOfbetsRolleteModel
