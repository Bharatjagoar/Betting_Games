const express = require("express")
const { UserHeaderDetails } = require("./profile.controllers")
const router = express.Router()

router.get("/userCoins/:id", UserHeaderDetails)


module.exports = router