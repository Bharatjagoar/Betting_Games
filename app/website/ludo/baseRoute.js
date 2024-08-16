const express = require("express")
const ludoUserContoller = require("./user/userController")


const router = express.Router()




// router.get("/wi",ludoUserContoller.First)
router.get("/LudocreateMatch",ludoUserContoller.createMatch)//creating ludo matches 
router.get("/LudoMovement",ludoUserContoller.Movement)
router.get("/createLudoUser",ludoUserContoller.createLudouser)
router.get("/LudoResult",ludoUserContoller.ResultDeclare)
router.get("/SetCategoryPrediciton",ludoUserContoller.SetCategoryPrediciton)
router.get("/test",ludoUserContoller.Testmatch)
router.get("/matchStart",ludoUserContoller.matchStart)
router.get("/fetchingPosition",ludoUserContoller.fetchingPosition)
router.get("/LudogameSignin",ludoUserContoller.GameSignin)


module.exports = router
