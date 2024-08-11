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


function getRandomNumberExceptZero(num) {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * 36) + 1; // Generate a random number between 1 and 36
    } while (randomNumber === num || randomNumber == 0);
    return randomNumber;
  }
  


module.exports.getNumber = async (req,res)=>{
    console.log("from getnumber")
    const {number,userId} = req.body
    console.log(number)
    
    try {
        const {win,lost,ratio} = await RolletUserDB.findOne({userName:userId})
        
        console.log(win,lost)
        let currentRatio = lost/win
        if(currentRatio>ratio){
            res.send(number)
        }else{
            let prediction = getRandomNumberExceptZero(number)
            res.send({prediction})
        }
    } catch (error){
        console.log("hello")
        console.log(error)
    }


    // res.send()
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

function generateUniqueRandomArray(start, end, item) {
    const range = end - start + 1;
    if (item > range) {
      throw new Error('Item count cannot be greater than range');
    }
  
    const numbers = [];
    while (numbers.length < item) {
      const randomNum = Math.floor(Math.random() * range) + start;
      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }
    return numbers;
}

function genarr(number,ratio){
    let percet = ratio/100
    const sixty = Math.round(number * percet);
    let arr = generateUniqueRandomArray(0, number - 1, sixty);
    console.log(number,arr)
    return arr;
}

module.exports.setRatio = async (req,res)=>{
    const {percent,numberOfbets} = req.body
    let Indices = genarr(number,percent)
    
    try {
        if(percent&&numberOfbets){
            const UpdatedDoc = await RolletUserDB.updateMany(
                {},
                {$set:{ratio:percent,winningIndices:Indices}},
                {new:true}
            )
            console.log(UpdatedDoc)
        }else if(percent){
            const updateDOC = await RolletUserDB.updateMany(
                {},
                {$set:{ratio:percent}},
                {new:true}
            )
        }
        res.send()
    } catch (error) {
     console.log(error)
     res.send(error)
    }
}