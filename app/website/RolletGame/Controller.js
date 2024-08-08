const RolletUserDB = require("./RoulletUserModel")
const dataDB = require("./bettingdataModel")
// const {setupSocket} = require("../../../Socket/socket")

// const io = setupSocket()

module.exports.Main=async ( req , res)=>{
    console.log("hello world ")
    io.emit("hellow","helloworld")
    res.send()
}

module.exports.createUser = async (req,res)=>{
    console.log("Result")
    try {
        const User = await RolletUserDB.create(req.body)
        console.log("user Created : ",User)
        res.send(User)
    } catch (error){
        console.log(error)
        res.send(error)
    }
}


module.exports.startBetting = async(req,res)=>{

    const {username,betdet} = req.body
    const date = new Date()
    if (!betdet.betType || !betdet.amount) {
        return res.status(400).send("Bet details are incomplete");
    }
    
    betdet.date = date.toLocaleString()
    console.log(betdet)
    try {
        const updateDOC = await RolletUserDB.findOneAndUpdate(
            {userName:username},
            {$push:{bets:betdet}},
            {new:true}
        )
        console.log(updateDOC)
        res.send(updateDOC)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    // res.send("afdsafdsa")
}

module.exports.Result = async (req,res)=>{
    console.log("hello world",req.body)
    const {result,username} = req.body
    try {
        if(result){
            const result = await RolletUserDB.findOneAndUpdate(
                {userName:username},
                {$inc:{win:1}},
                {new:true}
            )
            console.log(result)
            res.send(result)
        }else{
            const result = await RolletUserDB.findOneAndUpdate(
                {userName:username},
                {$inc:{lost:1}},
                {new:true}
            )
            console.log(result)
            res.send(result)
        }
        
    } catch (error) {
        console.log(error)
        res.send(error)
    }   
}

module.exports.getNumber = async (req,res)=>{
    console.log("from getnumber")
    const {number,userId} = req.body
    console.log(number)
    
    try {
        const userData = await RolletUserDB.findOne({userName:userId})
    } catch (error) {
        
    }


    res.send()
}

module.exports.getDataAdmin =async (req,res)=>{
    console.log("get data for admin")
    try {
        const ReadZero = await dataDB.findOne()
        console.log(ReadZero)
        res.send(ReadZero)
    } catch (error) {
        console.log("error",error)
        res.send(error)
    }
    // res.send("from data admin")
}


module.exports.updateNumberCount = async (req,res)=>{
    console.log("in counter")
    const {pos}= req.body
    const obj={}
    const querry = `data.${pos-1}`
    obj[querry] =1
    try {
        const result = await dataDB.findOneAndUpdate(
            {},
            {$inc:obj},
            {new:true}
        )
        console.log(result)
        res.send(result)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}