// cardfrombackend.js
const mongoose = require('mongoose');

const ABcardsSchema = new mongoose.Schema({
  cardsCodes: {
    type: [Number]
  }
},{timestamps:true});

const cardStoreModel = mongoose.model('cardStorage', ABcardsSchema);

async function instantiate(){
    try {
        const find = await cardStoreModel.findOne({})
        if(!find){
            const create = await cardStoreModel.create({cardsCodes:[]})
            
            console.log("created one")
        }else{
            console.log("already created cardstoremodel")
        }
    } catch (error) {
        
    }
}

instantiate()
module.exports = cardStoreModel;