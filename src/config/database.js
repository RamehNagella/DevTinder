const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://rameshnagella272:K9Lt9lpUOJiuotuO@cluster0.uajhu.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster0"
  );
};
// connectDB()
//   .then(() => {
//     console.log("Database connection established...");
//   })
//   .catch((err) => {
//     console.log("Database cannot be connected.");
//   });

module.exports = connectDB;
//eGeR4IvuROE0kgL2  password
