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
            red:{type:[Number]},
            blue:{type:[Number]},
            yellow:{type:[Number]},
            green:{type:[Number]}
        }
    }
    
},{timestamps:true});

// Create and export the model
const ludoMatchschemaList = mongoose.model('LudoMatchList', ludoMatchschema);
module.exports = ludoMatchschemaList;
