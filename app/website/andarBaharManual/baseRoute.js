const express  =require("express")
const andarBaharManualController = require("./controller/controller")
const router = express.Router()



// router.post("/AndarBaharSetCard")
router.post("/getcard",andarBaharManualController.setCardArray)
router.post("/AndarBaharManualcreateBet",andarBaharManualController.createBet)
router.get("/AdminReadBytype/:type",andarBaharManualController.readBetsfromType)


module.exports = router