const statementModel = require("../website/statements/models/statement.model")

exports.AddDataToStatement = async (userId,UserType,Description,amount,Amounttype, commi) => {
    const PreBlance = await statementModel.find({
        userId: userId,
    })
    const response = await statementModel.create({
        userId: userId,
        UserType:UserType,
        
    })
}