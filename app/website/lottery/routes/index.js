const express = require("express");
const lotteryController = require("../controller/lotteryController");

const router = express.Router();

router.post("/createLotteryBet", lotteryController.createBet)//creates bet 
router.post("/readbytype",lotteryController.readBetsfromType)//kind of... it gives stats to admin 
router.post("/LotterysetNumber",lotteryController.SetBettingNumber)//setting number from admin side 
router.get("/LotteryResult",lotteryController.result) 
router.get("/LotteryGetTheNUmber",lotteryController.GettheLotteryNumber)//to get the data of the current day 
router.get("/ResetLotteryNUmbers",lotteryController.ResetNumber)//dummy api for this project 

// router.get("/getLotterygames", getLotteryGame);
// router.post("/createLotterBet", AddLotteryBet);



module.exports =  router;