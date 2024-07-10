const express = require('express')
const Login = require('./Login.Controller')
const router = express.Router()

router.post("/login", Login.LoginUser)

module.exports = router