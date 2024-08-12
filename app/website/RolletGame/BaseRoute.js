const express = require("express")
const RolletController = require("./Controller")

const Router = express.Router()


Router.get("/Rollet",RolletController.Main)
Router.get("/Start",RolletController.startBetting)
Router.get("/createUser",RolletController.createUser)
Router.get("/startBetting",RolletController.startBetting)
Router.post("/ResultRollet",RolletController.Result)
Router.get("/RolletgetNumber/:number/:userId",RolletController.getNumber)
Router.post("/RolletsetRatio",RolletController.setRatio)//changes needs to be there
// Router.get("/getAdminData",RolletController.getDataAdmin)
// Router.get("/updateNumberCount",RolletController.updateNumberCount)

module.exports=Router