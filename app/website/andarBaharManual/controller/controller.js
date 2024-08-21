// controller.js
const cardStoreModel = require('../model/cardfrombackend'); // Import the model
const betsDB = require("../model/betschema")
// Use the cardStoreModel here
module.exports.setCardArray = async (req, res) => {
    const { id } = req.body
    console.log("from andar bahar")
    try {
        const udpatearr = await cardStoreModel.findOneAndUpdate(
            {},
            { $push: { cardsCodes: id } },
            { new: true }
        )
        res.status(200).send({ message: "done", data: udpatearr })
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "Error occured", data: null })
    }
    res.send()
}

module.exports.createBet = async (req, res) => {
    console.log(req.body)
    console.log("from create bet")
    try {
        const createBet = await betsDB.create(req.body)
        console.log("bet created ", createBet)
        res.status(201).send({ message: "bet created " })
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "error occured", data: null })
    }
    // res.send()
}




module.exports.readBetsfromType = async (req, res) => {
    // console.log(type)
    try {
        const find = await betsDB.find()
        console.log(find)
        const pipeline = [
            {
                $group: {
                    _id: "$betData",
                    count: { $sum: 1 },
                    totalAmount: { $sum: "$ammount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    betData: "$_id",
                    count: 1,
                    totalAmount: 1
                }
            },
            { $sort: { betData: 1 } }
        ];

        const result = await betsDB.aggregate(pipeline);

        console.log(result);
        res.status(200).send({message:"Successfully done",data:result});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error,data:null});
    }
};
function processCardsCodes(cardsCodes) {
    const firstItem = cardsCodes[0];
  
    const andar = [];
    const bahar = [];
  
    for (let i = 1; i < cardsCodes.length; i++) {
      if (i % 2 === 1) {
        andar.push(cardsCodes[i]);
      } else {
        bahar.push(cardsCodes[i]);
      }
    }
  
    return {
      firstItem,
      andar,
      bahar
    };
  }
  


module.exports.getCardsArr = async ( req , res )=>{
    
    console.log("hellow")
    try {
        const arr = await cardStoreModel.findOne({}).select("cardsCodes")
        let data  = processCardsCodes(arr.cardsCodes)
        // console.log(andar,bahar)
        // res.send("fdsafdsa")
        
        res.status(200).send({message:"got the array",data})
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "error occured", data: null })
    }
}