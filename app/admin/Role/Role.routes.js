const express = require('express')
const { getUpline, checkuprole } = require('./Role.controllers')

const router = express.Router()

router.get("/getUpline", getUpline)
router.get("/checkuprole", checkuprole)


module.exports = router