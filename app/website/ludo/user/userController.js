const matchDB = require("./matchschema")

module.exports.First = async (req,res)=>{
    console.log("from get ludo ")
    
    res.send("from 1 ")
}


module.exports.createMatch = async (req,res)=>{
    // here we have set whether the user will win or computer
    // we need how many computers will play the match the data needs to come from frontend
    // 
    console.log("set the probab",req.body)
    let checkProbab = req.body.matchwon%10
    let numberOFcomputer = req.body.computers
    let stat
    console.log(checkProbab)
        try {
            if(checkProbab in [2,4,9,8]){
                stat=1
            }else{
                stat=0
            }
            const doc = await matchDB.create(req.body)
            console.log(doc)
            res.send({match:doc.id,predict:stat})
        } catch (error) {
            console.log(error)
        }
    
}

module.exports.Movement=async (req,res)=>{
    console.log(req.body)
    try {
        
    } catch (error) {
        
    }
    res.send("movement ::")
}


module.exports.ResultDeclare = async (req,res)=>{
    console.log("Result Route")

}