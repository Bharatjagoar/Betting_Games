const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI_DEVELOPMENT);
    console.log("DB is connwected")
  } catch (error) {
    console.error(error)
  }
}


module.exports = connectDB