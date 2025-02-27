const mongoose = require("mongoose")

const ludoUserSchema = new mongoose.Schema({
    userName:{
        type:mongoose.Schema.Types.ObjectId,
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
},{timestamps:true})

const ludouserSchema = mongoose.model('ludouserSchema', ludoUserSchema);
module.exports = ludouserSchema;
