const { default: mongoose } = require("mongoose")
const mognoose = require("mongoose")

const AndarBaharBetSchema = mognoose.Schema({
    userId:{
        type:mognoose.Schema.Types.ObjectId,
        required:true
    },
    ammount:{
        type:Number,
        required:true
    },
    bettype:{
        type:String,
        enum:["Number","AB"]
    },  
    betData:{
        type:String
    }
})


const BetSchemaAndarBahar = mognoose.model("AndarBaharBetSchema",AndarBaharBetSchema)


module.exports = BetSchemaAndarBahar