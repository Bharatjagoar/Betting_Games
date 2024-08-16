const moment = require("moment");
const lotteryModel = require("../model/lotteryModel");
const clientModel = require("../../../admin/Users/models/client.model");
const lotteryBetModel = require("../model/lotteryBetModel");
const Lotterymodel = require("../model/lotteryModel");


const dateFormate = "YYYY-MM-DD, HH:mm:ss";
const timeIntervals = moment.duration(1, "minutes");

// function calculateReturn(amount, betType) {
//   let multiplier;

//   switch (betType) {
//     case "single":
//       multiplier = 9;
//       break;
//     case "jodi":
//       multiplier = 90;
//       break;
//     case "teenPatti":
//       multiplier = 900;
//       break;
//     default:
//       throw new Error("Invalid betType");
//   }

//   return amount * multiplier;
// }

// //crate lottery game...
// exports.createLotteryGame = async (req, res) => {
//   const { gameName, firstNumber, secondNumber, thirdNumber, startTime } =
//     req.body;

//   // Validating the date format...
//   if (!moment(startTime, dateFormate, true).isValid()) {
//     return res.status(400).json({
//       status: "Failed",
//       message: "Invalid date format. Please use YYYY-MM-DD-HH-mm-ss",
//     });
//   }

//   try {
//     const newDetails = new lotteryModel({
//       gameName,
//       firstNumber,
//       secondNumber,
//       thirdNumber,
//       startTime,
//     });

//     // console.log(newDetails);

//     const savedDetails = await newDetails.save();
//     // console.log(savedDetails);

//     res.status(201).json({
//       status: "success",
//       message: "Created Successfully...",
//       data: savedDetails,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "Failed",
//       message: "Failed to Create...",
//       error: error.message,
//     });
//   }
// };

// //get the lottery game data...
// exports.getLotteryGame = async (req, res) => {
//   try {
//     const lotterGames = await lotteryModel.find({});

//     const currentDateTime = moment();

//     const modifiedGames = lotterGames.map((item) => {
//       let startTime = moment(item.startTime, dateFormate);

//       if (currentDateTime.isBefore(startTime)) {
//         item.firstNumber = null;
//         item.secondNumber = null;
//         item.thirdNumber = null;
//       }

//       if (currentDateTime.isAfter(startTime)) {
//         if (currentDateTime.isBefore(startTime.clone().add(timeIntervals))) {
//           item.secondNumber = null;
//         }
//         if (
//           currentDateTime.isBefore(startTime.clone().add(timeIntervals * 2))
//         ) {
//           item.thirdNumber = null;
//         }
//       }

//       return item;
//     });
//     res.status(200).json({
//       status: "success",
//       message: "Data fetched successfully..",
//       data: modifiedGames,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "Failed",
//       message: "Failed to get the data...",
//       error: error.message,
//     });
//   }
// };

// exports.AddLotteryBet = async (req, res) => {
//   try {
//     const { userId, amount, betType, chosenNumbers } = req.body;

//     // Verify if the user exists
//     const userData = await clientModel.findById(userId);
//     if (!userData) {
//       return res.status(404).json({
//         status: "Failed",
//         message: "User not found",
//       });
//     }

//     // // Validate chosenNumbers value
//     // if (
//     //   (betType === "single" && !chosenNumbers < 10) ||
//     //   (betType === "jodi" && !chosenNumbers < 100) ||
//     //   (betType === "teenPatti" && !chosenNumbers < 1000)
//     // ) {
//     //   return res.status(400).json({
//     //     status: "Failed",
//     //     message: "Invalid chosenNumbers value for the selected betType...",
//     //   });
//     // }

//     // Create a new bet
//     const newBet = new lotteryBetModel({
//       UserId: userId,
//       betType,
//       chosenNumbers,
//       amount,
//     });

//     // Save the new bet
//     const savedBet = await newBet.save();

//     // Check the latest lottery game for winning bet
//     const latestGame = await lotteryModel.findOne().sort({ startTime: -1 });
//     const currentTime = moment();

//     if (!latestGame) {
//       return res.status(404).json({
//         status: "Failed",
//         message: "No lottery games found",
//       });
//     }

//     const startTime = moment(latestGame.startTime, dateFormate);
//     const firstNumberVisible = currentTime.isAfter(startTime);
//     const secondNumberVisible = currentTime.isAfter(
//       startTime.clone().add(timeIntervals)
//     );
//     const thirdNumberVisible = currentTime.isAfter(
//       startTime.clone().add(timeIntervals * 2)
//     );

//     let isWinningBet = false;
//     let returnAmount = 0;
//     let drawnNumber;
//     const betNumber = chosenNumbers;

//     if (betType === "single" && firstNumberVisible) {
//       if (latestGame.firstNumber === betNumber) {
//         returnAmount = calculateReturn(amount, betType);
//         isWinningBet = true;
//       }
//       console.log(latestGame.firstNumber, betNumber);
//     }

//     if (betType === "jodi" && firstNumberVisible && secondNumberVisible) {
//       drawnNumber = latestGame.firstNumber * 10 + latestGame.secondNumber;
//       if (drawnNumber === betNumber) {
//         returnAmount = calculateReturn(amount, betType);
//         isWinningBet = true;
//       }
//     }

//     if (
//       betType === "teenPatti" &&
//       firstNumberVisible &&
//       secondNumberVisible &&
//       thirdNumberVisible
//     ) {
//       drawnNumber =
//         latestGame.firstNumber * 100 +
//         latestGame.secondNumber * 10 +
//         latestGame.thirdNumber;
//       if (drawnNumber === betNumber) {
//         returnAmount = calculateReturn(amount, betType);
//         isWinningBet = true;
//       }
//     }

//     res.status(201).json({
//       status: "success",
//       message: "Bet placed successfully",
//       data: {
//         bet: savedBet,
//         isWinningBet,
//         returnAmount: isWinningBet ? returnAmount : 0,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "Failed",
//       message: "Failed to place bet",
//       error: error.message,
//     });
//   }
// };

//////// from here 



module.exports.createBet = async (req, res) => {
    console.log("hello")
    console.log(req.body)
    const { userId, betType, openNumber } = req.body
    const obj = {}
    // obj[`${betType}`] = openNumber
    try {
        const createBet = await lotteryBetModel.create(req.body)
        console.log(createBet)
        res.send(createBet)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

    // console.log("hello");
    // console.log(req.body);
    // const { userId, betType, openNumber, amount } = req.body;

    // // Check if userId is present
    // if (!userId) {
    //     return res.status(400).send({ error: "UserId is required" });
    // }

    // // Check if openNumber and amount are valid numbers
    // if (isNaN(openNumber) || isNaN(amount)) {
    //     return res.status(400).send({ error: "Invalid openNumber or amount" });
    // }

    // try {
    //     let bets = [];

    //     // Function to create a single bet
    //     const createSingleBet = async (type, number, amt) => {
    //         return await lotteryBetModel.create({
    //             UserId: userId,
    //             betType: type,
    //             Bettingnumber: number,
    //             ammount: amt
    //         });
    //     };

    //     // Extract digits
    //     const hundreds = Math.floor(openNumber / 100);
    //     const tens = Math.floor((openNumber % 100) / 10);
    //     const ones = openNumber % 10;

    //     // Validate extracted digits to ensure they are numbers
    //     if (isNaN(hundreds) || isNaN(tens) || isNaN(ones)) {
    //         return res.status(400).send({ error: "Invalid number extraction" });
    //     }

    //     // Create bets based on betType
    //     if (betType === 'teen') {
    //         bets.push(await createSingleBet('single', hundreds, amount / 3));
    //         bets.push(await createSingleBet('jodi', tens, amount / 3));
    //         bets.push(await createSingleBet('teen', ones, amount / 3));
    //     } else if (betType === 'jodi') {
    //         bets.push(await createSingleBet('single', tens, amount / 2));
    //         bets.push(await createSingleBet('jodi', ones, amount / 2));
    //     } else if (betType === 'single') {
    //         bets.push(await createSingleBet('single', ones, amount));
    //     }

    //     console.log(bets);
    //     res.send(bets);
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send(error);
    // }



    // console.log("hello");
    // console.log(req.body);
    // const { UserId, betType, openNumber, amount } = req.body;

    // // Check if userId is present
    // if (!UserId) {
    //     return res.status(400).send({ error: "UserId is required" });
    // }

    // // Check if openNumber and amount are valid numbers
    // if (isNaN(openNumber) || isNaN(amount)) {
    //     console.log(openNumber,amount)
    //     return res.status(400).send({ error: "Invalid openNumber or amount" });
    // }

    // try {
    //     let bets = [];

    //     // Function to create a single bet
    //     const createSingleBet = async (type, number, amt) => {
    //         return await lotteryBetModel.create({
    //             UserId: UserId,
    //             betType: type,
    //             Bettingnumber: number,
    //             ammount: amt
    //         });
    //     };

    //     // Extract digits
    //     const hundreds = Math.floor(openNumber / 100);
    //     const tens = Math.floor((openNumber % 100) / 10);
    //     const ones = openNumber % 10;

    //     // Validate extracted digits to ensure they are numbers
    //     if (isNaN(hundreds) || isNaN(tens) || isNaN(ones)) {
    //         return res.status(400).send({ error: "Invalid number extraction" });
    //     }

    //     // Create bets based on betType
    //     if (betType === 'teen') {
    //         bets.push(await createSingleBet('single', hundreds, amount / 3));
    //         bets.push(await createSingleBet('jodi', tens, amount / 3));
    //         bets.push(await createSingleBet('teen', ones, amount / 3));
    //     } else if (betType === 'jodi') {
    //         bets.push(await createSingleBet('single', tens, amount / 2));
    //         bets.push(await createSingleBet('jodi', ones, amount / 2));
    //     } else if (betType === 'single') {
    //         bets.push(await createSingleBet('single', ones, amount));
    //     }

    //     console.log(bets);
    //     res.send(bets);
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send(error);
    // }
}

module.exports.readBetsfromType = async (req, res) => {
    const { betType } = req.body;
    try {
        let pipeline;

        if (betType === "teen" || betType === "jodi") {
            pipeline = [
                { $match: { betType: betType } },
                {
                    $addFields: {
                        lastDigit: {
                            $cond: {
                                if: { $gte: ["$Bettingnumber", 10] },
                                then: { $mod: ["$Bettingnumber", 10] },
                                else: "$Bettingnumber"
                            }
                        }
                    }
                },
                {
                    $group: {
                        _id: "$lastDigit",
                        count: { $sum: 1 },
                        totalAmount: { $sum: "$ammount" }
                    }
                }
            ];
        } else {
            pipeline = [
                { $match: { betType: betType } },
                {
                    $group: {
                        _id: "$Bettingnumber",
                        count: { $sum: 1 },
                        totalAmount: { $sum: "$ammount" }
                    }
                }
            ];
        }

        // Common stages for all bet types
        pipeline = pipeline.concat([
            {
                $project: {
                    _id: 0,
                    Bettingnumber: "$_id",
                    count: 1,
                    totalAmount: 1
                }
            },
            { $sort: { Bettingnumber: 1 } }
        ]);

        const result = await lotteryBetModel.aggregate(pipeline);

        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};


module.exports.SetBettingNumber = async (req, res) => {
    let now = moment();
    let futureDate = now.add(4, "days"); // Create a Moment object for the future date
    
    let formattedDate = futureDate.format("DD MM YYYY"); // Format the future date as desired
    const day=futureDate.format("dddd")
    console.log(formattedDate,day); // Output: DD MM YYYY format of the future date
    
    console.log("from setBet")
    const { number, type } = req.body
    let obj = {}
    let query = `${type}`
    obj[query] = number


    try {
        const findDOC = await Lotterymodel.findOne({ dateToday: formattedDate })

        if (findDOC) {
            const findDOC = await Lotterymodel.findOneAndUpdate(
                { dateToday: formattedDate },
                { $set: obj },
                { new: true }
            )
            console.log(findDOC,"dind DOC")
            res.send(findDOC)
        } else {
            obj["dateToday"] = formattedDate
            obj["day"] = day
            const createDoc = await Lotterymodel.create(obj)
            console.log("created ", createDoc)
            res.send(createDoc)
        }
        
    } catch (error) {
        console.log("hello from err", error)
        res.send(error)
    }

}

module.exports.result = async (req, res) => {
    console.log("hello world")
    try {
        const foundDoc = await lotteryModel.findOne({})
        console.log(foundDoc)
        res.send(foundDoc)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}



module.exports.GettheLotteryNumber = async (req, res) => {
    // const {date} = req.body
    console.log("hello")
    console.log("from getthe number")
    try {
        const respo = await lotteryModel.find({})
        console.log(respo)
        res.send(respo)
    } catch (error){
        console.log(error)
    }
    // res.send("frm get the number")
}



module.exports.ResetNumber = async (req, res) => {
    console.log("from reset")
    let year = moment()
    // let year =  year.format("dd DD")

    let dare = year.format("dd DD")
    console.log(dare)

    // try {
    //     const UpdatedDOC =await lotteryModel.findOneAndUpdate(
    //         {},
    //         {$set:{
    //             firstNumber:-1,
    //             secondNumber:-1,
    //             thirdNumber:-1
    //         }},
    //         {new:true}
    //     )

    //     console.log(UpdatedDOC)
    // } catch (error) {
    //     console.log(error,"eror")
    // }
    // res.send("from reset")
    res.send()
}