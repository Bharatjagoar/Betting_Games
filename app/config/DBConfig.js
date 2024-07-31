const mongoose = require('mongoose');
const { initializeLudoMatchTable } = require("../website/ludo/user/ludoMatchTable")

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI_DEVELOPMENT);
    console.log("DB is connwected")
    initializeLudoMatchTable()
  } catch (error) {
    console.error(error)
  }
}


module.exports = connectDB