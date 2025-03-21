const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  emailId: {
    type: String
  },
  password: {
    type: String
  },
  age: {
    type: Number
  },
  gender: {
    type: String
  }
});
//create mongoose model
// const model = mongoose.model(modelName, Schema)
// const userModel = mongoose.model("User", userSchema);

// module.exports = userModel;

//or

module.exports = mongoose.model("User", userSchema);
