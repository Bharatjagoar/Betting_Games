const express = require("express");
const router = express.Router();
const {createLedger} = require("../controllers/ledgerController")


// routess here...'
router.get("/getLedger",createLedger);



module.exports = router;