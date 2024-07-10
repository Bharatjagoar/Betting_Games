const RegisterModel = require("../models/CreateUser.model")


const AddUser = async (req, res) => {
    try {
        console.log(req.body)
        const response = await RegisterModel.create(req.body)
        console.log(response)

        res.status(200).json({
            message: "sucessfully created user",
            result: response
        })
   } catch (error) {
    res.status(500).json({
        message: "internel error", error
    })
}
}


module.exports = AddUser
const GetUser = async (req, res) => {
    try {
        const response = await RegisterModel.find()
        res.status(200).json({
            message: "sucessfully fetch data",
            result: response
        })
    } catch (error) {
        res.status(500).json({
            message: "internel error", error
        })
    }
}


module.exports = {AddUser, GetUser}