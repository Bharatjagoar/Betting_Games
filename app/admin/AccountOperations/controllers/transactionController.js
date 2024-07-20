const transactionModel = require("../models/Transactions");
const moment = require("moment");

exports.createTransaction = async (req, res) => {
  try {
    const transaction = req.body;
    if (!transaction)
      res.status(404).json({
        message: "Provide the transction data",
      });
    const insertedTransaction = await transactionModel.create(transaction);
    if (!insertedTransaction) {
      res.status(404).json({
        message: "Transaction is not inserted...",
      });
    }
    res.status(200).json({
      message: "success",
      data: transaction,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error problem",
    });
  }
};

exports.getAllTransaction = async (req, res) => {
  try {
    const response = await transactionModel.find();
    if (response.length == 0) {
      res.status(404).json({
        message: "Transaction not founds",
      });
    } else {
      res.status(200).json({
        message: "Success",
        data: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error problem",
    });
  }
};

exports.fetchTransactionByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate)
      res.status(404).json({
        message: "startDate and endDate is required.",
      });

    const query = {
      Date: {
        $gte: moment(startDate, "MM/DD/YYYY").startOf("day").format("L"), // Start of startDate
        $lte: moment(endDate, "MM/DD/YYYY").endOf("day").format("L"), // End of endDate
      },
    };
    const transactions = await transactionModel.find(query);

    if (transactions.length == 0) {
      res.status(404).json({
        message: "No Transaction found",
        data: {},
      });
    } else {
      res.status(404).json({
        message: "success",
        data: transactions,
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error problem",
    });
  }
};
