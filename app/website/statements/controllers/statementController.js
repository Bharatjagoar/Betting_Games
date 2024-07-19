const statementModel = require("../models/statement.model");

exports.getStatement = async (req, res) => {
  try {
    const response = await statementModel.find();
    if (!response){
      return res.status(404).json({
        message: "statement not found",
        data: {},
      })
    }
    res.status(200).json({
      message: "success",
      data: response,
    });
  } catch (error) {
    return res.status(500).josn({
      message: "Internal Server Error.",
    });
  }
};
