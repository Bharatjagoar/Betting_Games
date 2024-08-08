const mongoose = require("mongoose")


const data = new mongoose.Schema({
    data:{
        type:[Number],
        default:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
},{timestamps:true})


const dataModel = mongoose.model("dataList",data)

async function instantiate(){
    dataModel.findOne({}).then((doc)=>{
        if(doc){
            console.log("already there ")
            return
        }
        dataModel.create({}).then((res)=>{
            console.log("created one array 0s")
        }).catch((err)=>{
            console.log(err)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}
instantiate()
module.exports=dataModel