const express = require("express");
const router = express.Router();
const { createProfitLoss } = require("../controllers/matchController");

router.post("/createProfitLoss", createProfitLoss);

module.exports = router;
