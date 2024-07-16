const express = require('express')
const {LimitUserList,LimitOwnerCoins,LimitUpadteUserCoins } = require('./limit.controllers')

const router = express.Router()


router.get("/LimitUserList", LimitUserList)
router.get("/LimitOwnerCoins/:id", LimitOwnerCoins)
router.put("/LimitUpadteUserCoins/:id", LimitUpadteUserCoins)


module.exports = router