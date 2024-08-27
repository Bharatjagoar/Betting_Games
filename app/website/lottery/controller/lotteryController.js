const moment = require("moment");
// const lotteryModel = require("../model/lotteryModel");
// const clientModel = require("../../../admin/Users/models/client.model");
const lotteryBetModel = require("../model/lotteryBetModel");
const Lotterymodel = require("../model/lotteryModel");
// const betDB = require("../../Bets/bets.model.js")
const AmountDB = require("../../manualAmount model/Amounts.js")
const clientModel = require("../../../admin/Users/models/client.model.js")
const statementdb = require("../../statements copy/models/statement.model.js")


//////// from here 



module.exports.createBet = async (req, res) => {
    console.log("hello")
    console.log(req.body)
    let { UserId, betType, openNumber, ammount } = req.body

    const obj = {}
    let createamount
    let updateamount
    // obj[`${betType}`] = openNumber
    const Description = "Created Lottery bet"
    try {

        const findtheuser = await clientModel.findById(UserId)
        if(findtheuser.coins<ammount){
            res.status(200).send({message:"Not enough coins",data:null})
        }
        
        const createBet = await lotteryBetModel.create(req.body)
        console.log(createBet)
        let prevbal =findtheuser.coins-ammount
        // const createLog = await statementdb.create({
        //     UserId:UserId,
        //     UserType:"client",
        //     Description:Description,
        //     Debit:ammount,
        //     PrevBalance:prevbal
        // })
        // console.log(createLog)
        let amt = ammount
        ammount = 0 - ammount


        const findAndupdate = await clientModel.findByIdAndUpdate(
            UserId,
            { $inc: { coins: ammount, explore: amt } },
            { new: true }
        )

        console.log(findAndupdate, "find and update")



        // commented because you will never create the client model here which means you will always find the user from client model



        // if (!findAndupdate) {
        //     createamount = await clientModel.create({ UserId: UserId })
        //     console.log(createamount, "AAAAAAAAAAAAAAAAAAAAAAAAAA")
        //     updateamount = await clientModel.findByIdAndUpdate(
        //         createamount.id,
        //         { $inc: { Ammount: ammount } }
        //     )
            // console.log(updateamount, "UUUUUUUUUUUUUUUUUU")
        // }
        res.send({ createBet, createamount, updateamount })
    } catch (error) {
        console.log(error)
        res.send(error)
    }

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



// const createLog = await statementdb.create({
//     UserId:UserId,
//     UserType:"client",
//     Description:Description,
//     Debit:ammount,
//     PrevBalance:prevbal
// })




// Function to update coins and explore fields based on bet results
async function updateBetResults(winners, losers) {
    // let desc = "lottery number won "
    try {
        // Update winners: Set explore to 0 and add the amount to coins
        for (const winner of winners) {
            let desc = "Lottery bet Won";

            let profitShare = ((winner.ammount)/10)+(winner.ammount);
            const exp = 0 - winner.ammount;
            console.log(winner.ammount, winner.UserId)
            let prevbal = winner.coins-winner.ammount
            
            const winnerUpdate = await clientModel.findByIdAndUpdate(
                winner.UserId,
                {
                    $inc: { coins: profitShare, explore: exp } // Increase coins by the winning amount
                    // $inc: { explore: exp }             // Deduct explore to 0
                }
            );
            const respo = await statementdb.create({
                UserId:winner.UserId,
                UserType:"client",
                PrevBalance:winnerUpdate.coins+winner.ammount,
                Credit:profitShare,
                Description:desc
            })
            console.log("Updated winner:", winnerUpdate);
            console.log("winner from windows ",winner)
        }

        // Update losers: Set explore to 0
        console.log(losers)
        for (const loser of losers) {
            
            let desc = "Lottery bet Lost";
            const exp = 0 - loser.ammount;
            const loserUpdate = await clientModel.findByIdAndUpdate(
                loser.UserId,
                {
                    $inc: { explore: exp }  // Deduct explore to 0
                }
            );
            console.log("looser statement",loserUpdate)
            const createLog = await statementdb.create({
                UserId:loser.UserId,
                UserType:"client",
                Description:desc,
                Debit:loser.ammount,
                PrevBalance:loserUpdate.coins+loser.ammount
            })
            console.log("Updated loser:", loserUpdate);
        }

        console.log("Bet results updated successfully.");
    } catch (error) {
        console.error("Error updating bet results:", error);
        throw error;
    }
}



async function getBetResults(betType, winningNumber, date) {
    // console.log("datae", date)
    const formattedDate = moment(date).format("DD MM YYYY");

    const momentDate = moment(formattedDate, "DD MM YYYY");
    // console.log(momentDate,"thisis mmentTTTTTTTTTTTTTTTTT")
    // Create start and end of the day as Date objects
    const startOfDay = momentDate.startOf('day').toDate(); // 00:00:00 of the day
    const endOfDay = momentDate.endOf('day').toDate();
    // console.log(startOfDay,"omentTTTTTTTTTTTTTTTTT")
    // console.log(endOfDay,"omentTTTTTTTTTTTTTTTTT")
    let querytype;
    if (betType === "firstNumber") {
        querytype = "single";
    } else if (betType === "secondNumber") {
        querytype = "jodi";
    } else if (betType === "thirdNumber") {
        querytype = "teen";
    }

    try {
        // Query for winning bets
        const winningBets = await lotteryBetModel.find({
            betType: querytype,
            Bettingnumber: winningNumber,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }, { UserId: 1, ammount: 1, _id: 0 });

        // Query for losing bets (bets not on the winning number)
        const losingBets = await lotteryBetModel.find({
            betType: querytype,
            Bettingnumber: { $ne: winningNumber },
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }, { UserId: 1, ammount: 1, _id: 0 });

        return {
            winners: winningBets,
            losers: losingBets
        };
    } catch (error) {
        console.error("Error fetching bet results:", error);
        throw error;
    }
}



module.exports.SetBettingNumber = async (req, res) => {
    const current = new Date();
    let numberofdays=0
    const formattedDate = moment(current).add(numberofdays,"days").format("DD MM YYYY"); // Format the date
    const day = moment(current).add(numberofdays, "days").format("dddd");
    console.log(formattedDate,day)
    // console.log(formattedDate, day);

    const { number, type } = req.body;
    let obj = {};
    obj[type] = number;

    try {
        console.log("here is the formatted date ")

        // Find the Lottery Document by date
        const findDOC = await Lotterymodel.findOne({ dateToday: formattedDate });

        if (findDOC) {
          // Update the document with the set number
          const updatedDoc = await Lotterymodel.findOneAndUpdate(
            { dateToday: formattedDate },
            { $set: obj },
            { new: true }
          );
          console.log("Updated Lottery Document:", updatedDoc);
        } else {
          // Create a new document for the day
          obj["dateToday"] = formattedDate;
          obj["day"] = day;
          const createDoc = await Lotterymodel.create(obj);
          console.log("Created Lottery Document:", createDoc);
        }

        // Fetch the bet results for the specified number and type
        const { winners, losers } = await getBetResults(type, number, current);

        console.log("Winners:", winners);
        console.log("Losers:", losers);

        // Update bet results in the clients collection
        await updateBetResults(winners, losers);
        let querytype;
        if (type === "firstNumber") {
            querytype = "single";
        } else if (type === "secondNumber") {
            querytype = "jodi";
        } else if (type === "thirdNumber") {
            querytype = "teen";
        }



        // here we are deleting the bets
        const findAnddeleteuser = await lotteryBetModel.find({ betType: querytype })
        for (let user of findAnddeleteuser) {
            console.log(user, "hello world")
            await lotteryBetModel.findByIdAndDelete(user._id)
        }
        // console.log(findAnddelete)

        res.status(200).send({ message: "Betting number set and results updated." });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
}


module.exports.result = async (req, res) => {
    console.log("hello world")
    try {
        const foundDoc = await Lotterymodel.findOne({})
        console.log(foundDoc)
        res.status().send({message:"successful",data:foundDoc})
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
        const respo = await Lotterymodel.find({})
        console.log(respo)
        res.send(respo)
    } catch (error) {
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


    res.send()
}