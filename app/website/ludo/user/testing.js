const mongoose=require("mongoose")
for (let i = 0; i < 9; i++) {
    const newObjectId = new mongoose.Types.ObjectId();
    console.log(newObjectId);
  }