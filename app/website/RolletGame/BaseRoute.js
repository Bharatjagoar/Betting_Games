const express = require("express")
const RolletController = require("./Controller")

const Router = express.Router()


Router.get("/Rollet",RolletController.Main)
Router.get("/Start",RolletController.startBetting)
Router.get("/createUser",RolletController.createUser)
Router.get("/startBetting",RolletController.startBetting)
Router.post("/ResultRollet",RolletController.Result)
Router.get("/getNumber",RolletController.getNumber)
Router.get("/setRatio",RolletController.setRatio)
// Router.get("/getAdminData",RolletController.getDataAdmin)
// Router.get("/updateNumberCount",RolletController.updateNumberCount)

module.exports=Router