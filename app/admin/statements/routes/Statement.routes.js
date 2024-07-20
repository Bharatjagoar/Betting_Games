const express = require("express");
const router = express.Router();
const {getStatement, getStatementById} = require("../controllers/statementController");


router.get("/getStatement", getStatement);
router.get("/getStatementById/:id", getStatementById);



module.exports = router;