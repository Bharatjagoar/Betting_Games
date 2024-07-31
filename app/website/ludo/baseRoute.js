const express = require("express")
const ludoUserContoller = require("./user/userController")


const router = express.Router()




router.get("/wi",ludoUserContoller.First)
router.get("/createMatch",ludoUserContoller.createMatch)
router.get("/Movement",ludoUserContoller.Movement)
router.get("/createLudoUser",ludoUserContoller.createLudouser)
router.get("/LudoResult",ludoUserContoller.ResultDeclare)
router.get("/SetCategoryPrediciton",ludoUserContoller.SetCategoryPrediciton)
router.get("/test",ludoUserContoller.Testmatch)
router.get("/matchStart",ludoUserContoller.matchStart)



module.exports = router
