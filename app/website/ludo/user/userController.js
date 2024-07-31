const matchDB = require("./matchschema")
const userDB = require("./UserSchema")
const {ludoMatchTableList} = require("./ludoMatchTable")




function generateRandomArray(start, end, item) {
    const range = end - start + 1;
    return Array.from({ length: item }, () => Math.floor(Math.random() * range) + start);
  }

module.exports.First = async (req,res)=>{
    console.log("from get ludo ")
    
    res.send("from 1 ")
}


module.exports.createMatch = async (req,res)=>{
    console.log(req.body)
    try {
        const created = await matchDB.create(req.body)
        console.log(created.id)
        let tableCategory = created.tableCategory
        let updateQuery = {};
        updateQuery[tableCategory]=created.id
        // const updateQuery ={$push:{req.body.tableCategory:created.id}}}
        const windows = await ludoMatchTableList.findOneAndUpdate(
            {},
            {$push:updateQuery},
            {new:true}
        )
        let lenght = windows[`${tableCategory}`].length
        let start = 0
        const number=49
        let stop = windows[`${tableCategory}`].length
        const sixty = Math.round(stop*0.6)
        const foty = Math.round(stop*0.4)
        console.log(sixty,foty)
        let item=6

        const arr = generateRandomArray(0,stop,sixty) 

        const arroffilteredIds = arr.map(index=>windows[`${tableCategory}`][index])
        console.log(arroffilteredIds)
        const setTheWinnigMatches = await matchDB.updateMany(
            {_id:{$in:arroffilteredIds}},
            {$set:{WinOrLoose:true}}
        )
        console.log(setTheWinnigMatches)
        const setTheLoosingMatches = await matchDB.updateMany(
            {_id:{$nin:arroffilteredIds}},
            {$set:{WinOrLoose:false}}
        )
        console.log(setTheLoosingMatches)
        
        
        res.send(windows)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


module.exports.Testmatch = async (req,res)=>{
    const test = await matchDB.findById("66a9df57e884d698335c11f1")
    console.log(test.WinOrLoose)
    test.WinOrLoose = !test.WinOrLoose
    await test.save()
    res.send()
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
    console.log(req.body)
    try {
        const {player,numberOfMoves} = req.body
        const match = await matchDB.findById(req.body.matchId)    
        console.log(match)
        let predict = match.WinOrLoose
        let move
        if(player && !predict){
            move = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        }
        else if(player && predict){
            if(numberOfMoves>2){
                move = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
            }else{
                move = Math.floor(Math.random() * (6 - 4 + 1)) + 4;
            }
        }
        else if(!player && !predict){
            move = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
        }
        else if(!player && predict){
            move = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        }
        console.log(move,player,numberOfMoves,"99999999999999999999999")
        res.send({move})
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