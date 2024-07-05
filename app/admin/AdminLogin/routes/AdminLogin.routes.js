const express = require('express')
const AdminLogin = require('../controllers/AdminLogin.controllers')
const logout = require('../controllers/AdminLogout.controllers')

const router = express.Router()

router.post("/AdminLogin", AdminLogin)
router.post("/AdminLogout", logout)


module.exports = router
