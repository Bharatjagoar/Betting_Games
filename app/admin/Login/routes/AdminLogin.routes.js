const express = require('express')
const {AdminLogin, LoginDetails} = require('../controllers/AdminLogin.controllers')
const logout = require('../controllers/AdminLogout.controllers')

const router = express.Router()

router.post("/AdminLogin", AdminLogin)
router.get("/LoginDetailsbyId/:id", LoginDetails)
router.post("/AdminLogout", logout)


module.exports = router
