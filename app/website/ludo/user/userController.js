const matchDB = require("./matchschema")
const userDB = require("./UserSchema")
module.exports.First = async (req,res)=>{
    console.log("from get ludo ")
    
    res.send("from 1 ")
}


module.exports.createMatch = async (req,res)=>{
    // here we have set whether the user will win or computer
    // we need how many computers will play the match the data needs to come from frontend


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
    const {player,predict,numberOfMoves} = req.body
    let move
    try {
        if(player && predict=="loose"){
            move = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        }
        else if(player && predict=="win"){
            if(numberOfMoves>2){
                move = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
            }else{
                move = Math.floor(Math.random() * (6 - 4 + 1)) + 4;
            }
        }
        else if(!player && predict=="loose"){
            move = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
        }
        else if(!player && predict=="win"){
            move = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        }
        console.log(move,player,numberOfMoves,"99999999999999999999999")
        res.send({move})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    // res.send("movement ::")
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