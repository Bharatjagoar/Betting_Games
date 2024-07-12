const express = require("express")
const { UserHeaderDetails, UserInfo, getpassbook, completedgames, getledger} = require("./profile.controllers")
const router = express.Router()

router.get("/userCoins/:id", UserHeaderDetails)
router.get("/userInfo/:id", UserInfo)
router.get("/getpassbook/:id", getpassbook)
router.get("/completed-games/:id", completedgames)
router.get("/getledger/:id", getledger)


module.exports = router