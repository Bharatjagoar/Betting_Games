const express = require('express')
const { getUpline } = require('./Role.controllers')

const router = express.Router()

router.get("/getUpline", getUpline)


module.exports = router