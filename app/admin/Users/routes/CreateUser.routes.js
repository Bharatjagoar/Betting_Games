const express = require('express')
const {AddUser,GetUser, CreateClient, GetOwnerCoins, getUserListByRole, GetClient, updateUserStatus,getUserById, updateClientById } = require('../controllers/CreateUser.controllers')

const router = express.Router()

router.post("/CreateAdmin", AddUser)
router.post("/CreateClient", CreateClient)
router.get("/userList", GetUser)
router.put("/updateUserStatus/:id", updateUserStatus)


router.get("/ClientUserList", GetClient)
// router.get("/getUpline", getUpline)
router.get("/getUserListByRole", getUserListByRole)
router.get("/getOwnerCoins/:id", GetOwnerCoins)

router.get("/getUserById/:id",getUserById);
router.put("/updateClient/:id",updateClientById);


module.exports = router