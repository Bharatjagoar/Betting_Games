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
    const { type } = req.params;
    console.log(type)
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
        res.send();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
