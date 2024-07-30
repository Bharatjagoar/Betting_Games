const mongoose = require("mongoose")

const ludoUserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    matchstats:{
        won:{
            type:Number,
            default:0
        },
        lost:{
            type:Number,
            default:0
        }
    }
})