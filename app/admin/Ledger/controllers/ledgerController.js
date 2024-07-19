const ledgerModel = require("../models/ledger.model")

exports.createLedger = async (req,res)=>{
  try {
    // console.log("everthing is perfect....")
    // const data = await ledgerModel.find();
    // console.log(data);
    // res.send(data);

  } catch (error) {
    res.status(500).json({
    message:"Internal error..."
    })
  }
}