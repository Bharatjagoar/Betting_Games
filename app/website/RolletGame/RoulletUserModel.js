const mongoose = require("mongoose")

const RolletUser = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    win:{
        type:Number,
        default:0
    },
    lost:{
        type:Number,
        default:0
    },
    numberOfbets:{
        type:Number,
        default:0
    },
    ratio:{
        type:Number,
        default:7
    },
    winningIndices:{
        type:[Number],
        default:null
    },
    bets:[{
        betType: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now }
    }]
})

const RolletUserModel = mongoose.model('RolletUserdata', RolletUser);

module.exports = RolletUserModel 