const express = require('express')
const AddUser = require('../controllers/CreateUser.controllers')

const router = express.Router()

router.post("/CreateUser", AddUser)


module.exports = router