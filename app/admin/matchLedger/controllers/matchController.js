const matchLedger = require("../models/match.ledger");

exports.createProfitLoss = async (req, res) => {
  try {
    console.log("hello");
    const response = await matchLedger.create(req.body);
    res.status(200).json({
      message: "Success",
      data: response,
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({
      message: "Internal Server Error.",
    });
  }
};
