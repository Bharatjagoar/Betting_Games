const express = require("express")
const { MatchListData } = require("./Match.controllers")
const router = express.Router()

router.get("/MatchList", MatchListData)


module.exports = router