const mongoose = require('mongoose');

// Define the main schema with the nested event object
const ludoMatchschema = new mongoose.Schema({
    player:{
            blue:{
                id:{type:mongoose.Schema.Types.ObjectId},
            },
            green:{
                id:{type:mongoose.Schema.Types.ObjectId},
            },
            yellow:{
                id:{type:mongoose.Schema.Types.ObjectId},
            },
            red:{
                id:{type:mongoose.Schema.Types.ObjectId},
            }
        },
    playerPosition:{
        type:Object,
        required:true,
        properties:{
            red:{type:[Number],default:[0,0,0,0]},
            blue:{type:[Number],default:[0,0,0,0]},
            yellow:{type:[Number],default:[0,0,0,0]},
            green:{type:[Number],default:[0,0,0,0]}
        }
    },
    numberOfmoves:{
        type:Object,
        required:true,
        properties:{
            red:{type:Number,default:0},
            green:{type:Number,default:0},
            blue:{type:Number,default:0},
            yellow:{type:Number,default:0}
        }
    },
    WinOrLoose:{
        type:Boolean,
        required:true
    },
    
    tableCategory:{
        type:String
    }
    
},{timestamps:true});

// Create and export the model
const ludoMatchschemaList = mongoose.model('LudoMatchList', ludoMatchschema);
module.exports = ludoMatchschemaList;
