const statementModel = require("../../../website/statements/models/statement.model");

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

exports.getStatementById = async (req, res) => {
  try {
    const {id} = req.params
    console.log(id)
    const response = await statementModel.find(
      {userId: id}
    );
    console.log(response)
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