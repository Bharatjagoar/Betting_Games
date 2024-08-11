const matchDB = require("./matchschema")
const userDB = require("./UserSchema")
const mongoose = require("mongoose")
const {ludoMatchTableList} = require("./ludoMatchTable")




module.exports.GameSignin = async (req,res)=>{
    console.log("hello world")
    console.log(req.body)
    let updateQuery = {}
    let propertyName = `${req.body.matchType}`
    console.log(propertyName)
    updateQuery[propertyName]=req.body.userId
    try {
        const updateDOC = await ludoMatchTableList.updateOne({},{$push:updateQuery},{new:true})
        console.log(updateDOC)
        res.send(updateDOC)
    } catch (error){
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

function genarr(number){
    const sixty = Math.round(number * 0.6);
    let arr = generateUniqueRandomArray(0, number - 1, sixty);
    console.log(number,arr)
    return arr;
}

function generateComputerId() {
    return new mongoose.Types.ObjectId();
}

function generateMatch(players, category) {
    const colors = ["green", "blue", "red", "yellow"];
    let matches = [];
    let playerIndex = 0;
    if(players.length<1)
        return null
    // Generate winning indices
    const winningIndices = genarr(Math.ceil(players.length / 3));

    while (playerIndex < players.length) {
        let match = {
            player: {},
            playerPosition: {},
            numberOfMoves: {},
            WinOrLoose: false,
            tableCategory: category,
            computerPlayer: { id: null, color: null }
        };

        let availableColors = [...colors];
        let computerAdded = false;

        // Add manual players
        while (playerIndex < players.length && availableColors.length > 1) {
            let color = availableColors.shift();
            match.player[color] = { id: players[playerIndex] };
            match.playerPosition[color] = [0, 0, 0, 0];
            match.numberOfMoves[color] = 0;
            playerIndex++;
        }

        // Ensure at least one computer player
        if (!computerAdded) {
            let computerColor = availableColors.shift();
            let computerId = generateComputerId();
            match.player[computerColor] = { id: computerId };
            match.playerPosition[computerColor] = [0, 0, 0, 0];
            match.numberOfMoves[computerColor] = 0;
            match.computerPlayer = { id: computerId, color: computerColor };
            computerAdded = true;
        }

        // Fill remaining slots if any
        while (availableColors.length > 0) {
            let color = availableColors.shift();
            if (computerAdded) {
                // Add another manual player if possible
                if (playerIndex < players.length) {
                    match.player[color] = { id: players[playerIndex] };
                    playerIndex++;
                } else {
                    // If no more manual players, leave empty
                    match.player[color] = { id: null };
                }
            } else {
                // Add a computer player
                let computerId = generateComputerId();
                match.player[color] = { id: computerId };
                match.computerPlayer = { id: computerId, color: color };
                computerAdded = true;
            }
            match.playerPosition[color] = [0, 0, 0, 0];
            match.numberOfMoves[color] = 0;
        }

        // Set WinOrLoose based on winningIndices
        match.WinOrLoose = winningIndices.includes(matches.length);

        matches.push(match);
    }

    return matches;
}

// right now we are able to create matches 
// next step is to how to set compute in for that

module.exports.createMatch = async (req, res) => {
    try {
        let InsertedDoc
        console.log("Creating match");
        const FoundDoC = await ludoMatchTableList.findOne();
        let fiveThousandPlayers = FoundDoC.fiveThousand;
        let oneThousandPlayers = FoundDoC.thousand
        let twoThousandPlayers = FoundDoC.twoThousand
        let tenThousandPlayers = FoundDoC.tenThousands
        let insertThis = generateMatch(fiveThousandPlayers, "fiveThousand");
        if(insertThis){
            InsertedDoc = await matchDB.insertMany(insertThis);
        }
        insertThis = generateMatch(oneThousandPlayers, "thousand");
        if(insertThis){
            InsertedDoc = await matchDB.insertMany(insertThis);
        }
        insertThis = generateMatch(twoThousandPlayers, "twoThousand");
        if(insertThis){
            InsertedDoc = await matchDB.insertMany(insertThis);
        }
        insertThis = generateMatch(tenThousandPlayers, "tenThousands");
        if(insertThis){
            InsertedDoc = await matchDB.insertMany(insertThis);
        }
        
        console.log(InsertedDoc)

        
        res.send(InsertedDoc);
    } catch (error) {
        console.log("Error creating match:", error);
        res.status(500).send(error);
    }
}

module.exports.Testmatch = async (req,res)=>{
    try {
        const Found = await matchDB.findOne(req.body.matchId)
        const udpate = await matchDB.updateOne()
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


module.exports.matchStart = async (req,res)=>{
    console.log("match start")
    const reset = await ludoMatchTableList.findOneAndUpdate({},{
        $set:{
            thousand:[],
            tenThousands:[],
            fiveThousand:[],
            twoThousand:[]
        }
    },{new:true})
    res.send(reset)
}
module.exports.Movement=async (req,res)=>{
    // task here is to generate the move and also 
    // udpate the movement in backend 
    console.log(req.body)
    try {
        const {player,numberOfMoves} = req.body
        const match = await matchDB.findById(req.body.matchId)
        const findQuery = {}
        let updateQuery = `playerPosition.${req.body.color}.${req.body.peice}`
        
        console.log(match)
        let predict = match.WinOrLoose
        let move
        if(player && !predict){
            if(numberOfMoves%9==0){
                move=6
            }else{
                move = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
            }
        }
        else if(player && predict){
            move = Math.floor(Math.random() * (6 - 4 + 1)) + 4;
        }
        else if(!player && !predict){
            move = Math.floor(Math.random() * (6 - 2 + 1)) + 2;
        }
        else if(!player && predict){
            move = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        }
        
        console.log(move,player,numberOfMoves,"99999999999999999999999")
        findQuery[updateQuery] = req.body.piecePosistion+move
        const result = await matchDB.findByIdAndUpdate(
            req.body.matchId,
            {$set:findQuery},
            {new:true})
        res.send({move,result})
    } catch (error) {
        console.log("err",error)
        res.send(error)
    }
    
}


module.exports.createLudouser = async (req,res)=>{
    
    try {
        const createduser = await userDB.create(req.body)
        console.log(createduser)
        res.send(createduser)
    } catch (error) {
        console.log("error ",error)
    }
}

module.exports.ResultDeclare = async (req, res) => {
    const { result, username } = req.body;
    try {
      const updateQuery = {
        $inc: result ? { "matchstats.won": 1 } : { "matchstats.lost": 1 }
      };

      const updatedUser = await userDB.findOneAndUpdate(
        { userName: username },
        updateQuery,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating match stats:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports.SetCategoryPrediciton = async (req,res)=>{
    console.log("hello world")
    // generate a random number 
    // const table=req.body.category
    // const findQuery = {`${table}`:}
    try {
        console.log(req.body)
        const number = 10
        const tabledetails = await ludoMatchTableList.findOne()
        console.log( Math.round(eval(`300*(${number}/100)`)))
        res.send("from setting probabilty for table prediction")
    } catch (error) {
        console.log("erorr",error)
        res.send(error)
    }
}


module.exports.setMatchPrediction = async ( req,res )=>{
    res.send("from match prediction")
}


module.exports.fetchingPosition = async (req,res)=>{
    console.log("fetch")
    try {
        const {color,pos,number} = req.body
        let updateField = `playerPosition.${color}.${pos}`;
        update={}
        update[updateField]=number
        console.log(update)
        const result = await matchDB.findByIdAndUpdate("66aa029c9989fe38262039a9",
            {$set:update}
        )
        console.log(result)
        res.send("fetched")
    } catch (error){
        console.log("error ",error)
        res.send(error)
    }
}






module.exports.Matchgame = async (io) =>{
    console.log("helll wor")
    io.emit("yes",{message:"hello world"})
    return
}