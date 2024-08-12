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
        console.log("updateDOC",updateDOC,"updateDOC")
        res.send(updateDOC)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
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


function getRandomNumberExcluding(excludedNumber) {
    // Generate a random number between 0 and 35
    let randomNumber = Math.floor(Math.random() * 37);
    
    // If the generated number is the one to be excluded, generate again
    while (randomNumber === excludedNumber) {
        randomNumber = Math.floor(Math.random() * 37);
    }
    
    return randomNumber;
}


module.exports.getNumber = async (req,res)=>{
    console.log("from getnumber")
    // console.log(req.params)
    const {number,userId} = req.params
    console.log(number)
    let responumber =getRandomNumberExcluding(number)
    console.log(number,responumber)
    try {
        const {winningIndices,numberOfbets,numberOfmoves} = await RolletUserDB.findOne({userName:userId}).select("winningIndices numberOfbets numberOfmoves")
        // console.log(numberOfbets,winningIndices)
        let exactNumber = numberOfbets%numberOfmoves
        
        console.log(exactNumber,winningIndices.includes(exactNumber),"windows alert",numberOfbets,numberOfmoves)
        
        if(winningIndices.includes(exactNumber)){
            console.log("win")
            res.send({number})
        }else{ 
            console.log("loose",)
            res.send({responumber})
        }
        // let currentRatio = lost/win
        // if(currentRatio>ratio){
        //     res.send(number)
        // }else{
        //     let prediction = getRandomNumberExceptZero(number)
        //     res.send({prediction})
        // }

        const updateDOC = await RolletUserDB.findOneAndUpdate(
            {userName:"bharatjagoar"},
            {$inc:{numberOfbets:1}}
        )
        
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

function generateUniqueArray(moves, percentage) {
    // Calculate the number of items to include in the array
    const itemCount = Math.round((moves * percentage) / 100);
    
    // Use a Set to ensure unique values
    const uniqueValues = new Set();
    
    // Populate the set with unique random values between 1 and 10
    while (uniqueValues.size < itemCount) {
        uniqueValues.add(Math.floor(Math.random() * 10) + 1);
    }
    
    // Convert the set back to an array and return it
    return Array.from(uniqueValues);
}





module.exports.setRatio = async (req,res)=>{

    const {percentage,numberOfmoves} = req.body
    let totalNumber = numberOfmoves*(percentage/100)
    let arr = generateUniqueArray(numberOfmoves,percentage)
    try {
        const UpdateDoc = await RolletUserDB.updateMany(
            {},
            {$set:{winningIndices:arr,numberOfbets:0,numberOfmoves:numberOfmoves}},
            {new:true}
        )
        console.log(UpdateDoc)
        console.log(arr)
        console.log("windows")
        res.send("hello world ")
    } catch (error) {
     console.log(error)
     res.send(error)
    }
}