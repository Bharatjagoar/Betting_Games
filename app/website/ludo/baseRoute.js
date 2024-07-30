const express = require("express")
const ludoUserContoller = require("./user/userController")


const router = express.Router()




router.get("/wi",ludoUserContoller.First)
router.get("/createMatch",ludoUserContoller.createMatch)
router.get("/Movement",ludoUserContoller.Movement)



module.exports = router
