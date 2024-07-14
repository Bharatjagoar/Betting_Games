const express = require('express')
const {AddUser,GetUser, CreateClient, GetOwnerCoins, getUserListByRole, GetClient } = require('../controllers/CreateUser.controllers')

const router = express.Router()

router.post("/CreateAdmin", AddUser)
router.post("/CreateClient", CreateClient)
router.get("/userList", GetUser)
router.get("/ClientUserList", GetClient)
// router.get("/getUpline", getUpline)
router.get("/getUserListByRole", getUserListByRole)
router.get("/getOwnerCoins/:id", GetOwnerCoins)


module.exports = router