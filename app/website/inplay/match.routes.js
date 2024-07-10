const express = require("express")
const { Getmatchdata } = require("./match.controller")
const router = express.Router()

router.get("/match", Getmatchdata)


module.exports = router