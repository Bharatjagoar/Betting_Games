const express = require('express')
const {AddUser,GetUser } = require('../controllers/CreateUser.controllers')

const router = express.Router()

router.post("/CreateUser", AddUser)
router.get("/get_users", GetUser)


module.exports = router