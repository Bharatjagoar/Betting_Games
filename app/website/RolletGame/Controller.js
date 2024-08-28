const RolletUserDB = require("./RoulletUserModel")
const dataDB = require("./bettingdataModel")
// const {setupSocket} = require("../../../Socket/socket")
const clientModel = require("../../admin/Users/models/client.model")
const RolleteNumberofBets = require("./NumberOfBetsRollet")


// const io = setupSocket()
let red=[1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
let black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]

module.exports.Main=async ( req , res)=>{
    console.log("hello world ")
    res.status(200).send({message:"working fine"})
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
    // Create an array of all possible numbers including 0 and 00
    const allNumbers = [0, "00", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
  
    // Remove the excluded number from the array
    const filteredNumbers = allNumbers.filter(num => num !== excludedNumber);
  
    // Generate a random index within the filtered array
    const randomIndex = Math.floor(Math.random() * filteredNumbers.length);
  
    return filteredNumbers[randomIndex] === '00' ? 0 : parseInt(filteredNumbers[randomIndex])
  }


module.exports.getNumber = async (req,res)=>{
    console.log("from getnumber")
    let colors,type
    // console.log(req.params)
    const {number,userId,amount} = req.params
    console.log(number)
    let responumber = getRandomNumberExcluding(number)
    console.log(number,responumber)
    try {
        const {winningIndices,numberOfbets,totalChances} = await RolleteNumberofBets.findOne({})
        // console.log(numberOfbets,winningIndices)
        let exactNumber = numberOfbets%totalChances
        
        console.log(exactNumber,winningIndices.includes(exactNumber),"windows alert",numberOfbets,totalChances)


        await RolleteNumberofBets.findOneAndUpdate(
            {},
            {$inc:{numberOfbets:1}}
        )


        
        if(winningIndices.includes(exactNumber)){

            console.log("win")
            const clientupdate = await clientModel.findByIdAndUpdate(
                userId,
                {$inc:{coins:amount}}
            )
            if(number%2==0){
                type="even"
            }else{
                type="odd"
            }
            if(red.includes(number)){
                colors="red"
            }
            if(black.includes(responumber)){
                colors="black"
            }
            res.status(200).send({number,colors,})
        }else{ 
            let lost = 0 - amount
            const clientupdate = await clientModel.findByIdAndUpdate(
                userId,
                {$inc:{coins:lost}}
            )
            console.log("loose")
            if(responumber%2==0){
                type="even"
            }else{
                type="odd"
            }
            if(red.includes(responumber)){
                colors="red"
            }
            if(black.includes(responumber)){
                colors="black"
            }
            
            res.send({number:responumber})
        }
        // let currentRatio = lost/win
        // if(currentRatio>ratio){
        //     res.send(number)
        // }else{
        //     let prediction = getRandomNumberExceptZero(number)
        //     res.send({prediction})
        // }

        // const updateDOC = await RolletUserDB.findOneAndUpdate(
        //     {userName:"bharatjagoar"},
        //     {$inc:{numberOfbets:1}}
        // )
        
    } catch (error){
        console.log("hello")
        console.log(error)
    }
    
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

// function generateUniqueRandomArray(start, end, item) {
//     const range = end - start + 1;
//     if (item > range) {
//       throw new Error('Item count cannot be greater than range');
//     }
  
//     const numbers = [];
//     while (numbers.length < item) {
//       const randomNum = Math.floor(Math.random() * range) + start;
//       if (!numbers.includes(randomNum)) {
//         numbers.push(randomNum);
//       }
//     }
//     return numbers;
// }

// function genarr(number,ratio){
//     let percet = ratio/100
//     const sixty = Math.round(number * percet);
//     let arr = generateUniqueRandomArray(0, number - 1, sixty);
//     console.log(number,arr)
//     return arr;
// }

function generateUniqueArray(moves, percentage) {
    // Calculate the number of items to include in the array
    let itemCount = Math.round((moves * percentage) / 100);
    console.log(itemCount, "item count");
    
    // Use a Set to ensure unique values
    const uniqueValues = new Set();
    
    // Populate the set with unique random values between 1 and moves
    while (uniqueValues.size < itemCount) {
        uniqueValues.add(Math.floor(Math.random() * moves) + 1);
    }
    console.log(uniqueValues, "unique arr");
    
    // Convert the set back to an array and return it
    return Array.from(uniqueValues);
}






module.exports.setRatio = async (req,res)=>{
    
    const {percentage,numberOfmoves} = req.body
    let totalNumber = numberOfmoves*(percentage/100)
    let arr = generateUniqueArray(numberOfmoves,percentage)
    console.log(arr)
    try {
        // const UpdateDoc = await RolletUserDB.updateMany(
        //     {},
        //     {$set:{winningIndices:arr,numberOfbets:0,numberOfmoves:numberOfmoves}},
        //     {new:true}
        // )

        const updatearr = await RolleteNumberofBets.findOneAndUpdate(
            {},
            {$set:{winningIndices:arr,totalChances:numberOfmoves}}
        )
        console.log(updatearr)
        console.log(arr)
        console.log("windows")
        res.status(200).send({message:"successfull",data:updatearr})
    } catch (error) {
     console.log(error)
     res.send(error)
    }
}