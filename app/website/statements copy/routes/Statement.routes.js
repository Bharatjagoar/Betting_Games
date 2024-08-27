const express = require("express");
const router = express.Router();
const {getStatement, getStatementById} = require("../controllers/statementController");


router.get("/getStatement2", getStatement);
router.get("/getStatementById2/:id", getStatement);



module.exports = router;