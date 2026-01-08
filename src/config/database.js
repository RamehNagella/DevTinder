const mongoose = require("mongoose");

const connectDB = async () => {
  try{

    // console.log(".env: ",process.env.DB_CONNECTION_SECRET)
    await mongoose.connect(process.env.DB_CONNECTION_SECRET);

  } catch(error){
    console.log("MongoDB connection failed due to connection string problem.")
  }
};

module.exports = connectDB;
