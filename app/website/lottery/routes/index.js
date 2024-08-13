const express = require("express");
const lotteryController = require("../controller/lotteryController");

const router = express.Router();

router.post("/createLotteryBet", lotteryController.createBet)
router.post("/readbytype",lotteryController.readBetsfromType)
router.post("/setNumber",lotteryController.SetBettingNumber)
router.get("/LotteryResult",lotteryController.result)
router.get("/LotteryGetTheNUmber",lotteryController.GettheLotteryNumber)
router.get("/ResetLotteryNUmbers",lotteryController.ResetNumber)

// router.get("/getLotterygames", getLotteryGame);
// router.post("/createLotterBet", AddLotteryBet);



module.exports =  router;