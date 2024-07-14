const AdminModel = require("../models/Admin.model")
const clientModel = require("../models/client.model")


const crypto = require('crypto');

function generateUsername() {
  const prefix = "ADM";
  const length = 8;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = crypto.randomBytes(length - prefix.length);
  let result = prefix;

  for (let i = 0; i < bytes.length; i++) {
    result += characters[bytes[i] % characters.length];
  }

  return result;
}

exports.AddUser = async (req, res) => {
    try {
        console.log(req.body)
        // Example usage
        const username = generateUsername();
        req.body.username = username
        const response = await AdminModel.create(req.body)

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


exports.GetUser = async (req, res) => {
    try {
        const response = await AdminModel.find()
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

exports.getUserListByRole = async (req, res) => {
    try {
        console.log(req.query.role)
        const response = await AdminModel.find({
            userType: req.query.role
        })
        res.status(200).json({
            message: "sucessfully fetch data",
            data: response
        })
    } catch (error) {
        res.status(500).json({
            message: "internel error", error
        })
    }
}
exports.getUpline = async (req, res) => {
    try {
        console.log(req.query.role)
        const response = await AdminModel.find({
            userType: req.query.role
        })
        res.status(200).json({
            message: "sucessfully fetch data",
            data: response
        })
    } catch (error) {
        res.status(500).json({
            message: "internel error", error
        })
    }
}

exports.CreateClient = async (req, res) => {
    try {
        const username = generateUsername();
        req.body.username = username
        const response = await clientModel.create(req.body)


        res.status(200).json({
            message: "sucessfully Create Client",
            result: response
        })
   } catch (error) {
    res.status(500).json({
        message: "internel error", error
    })
}
}
exports.GetClient = async (req, res) => {
    try {
        const response = await clientModel.find()
        res.status(200).json({
            message: "sucessfully fetch data",
            data: response
        })
    } catch (error) {
        res.status(500).json({
            message: "internel error", error
        })
    }
}

exports.GetOwnerCoins = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        const response = await AdminModel.findById(id).select('name coins username');

        res.status(200).json({
            message: "sucessfully Create Client",
            data: response
        })
   } catch (error) {
    res.status(500).json({
        message: "internel error", error
    })
}
}


