const express = require("express");
const router = express.Router();
const { createTransaction,getAllTransaction,fetchTransactionByDate } = require("../controllers/transactionController");

router.post("/createTransaction", createTransaction);
router.get("/getAllTransaction",getAllTransaction);
router.get("/getTransactionByDate", fetchTransactionByDate);

module.exports = router
