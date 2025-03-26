const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50
    },
    lastName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,

      validate: {
        validator: function (value) {
          console.log("Validating email: ", value);
          return validator.isEmail(value);
        },
        message: (props) => `Invalid email: ${props.value}`
      }

      // validate(value) {
      //   if (!validator.isEmail(value)) {
      //     throw new Error("Invalid email address:" + value);
      //   }
      //   return true;
      // }
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong: " + value);
        }
      }
    },
    age: {
      type: Number,
      min: 15
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data not valid.");
        }
      }
    },
    photoUrl: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/USAFA_Hosts_Elon_Musk_%28Image_1_of_17%29_%28cropped%29.jpg/450px-USAFA_Hosts_Elon_Musk_%28Image_1_of_17%29_%28cropped%29.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Phot URL: " + value);
        }
      }
    },
    about: {
      type: String,
      default: "This is the default value"
    },
    skills: {
      type: [String]
    }
  },
  {
    timestamps: true // stores created time when user loggedIN
  }
);

userSchema.index({ firstName: 1 });
userSchema.index({ firstName: 1, age: 1 });

userSchema.methods.getJWT = async function () {
  // here arrow function is not used because it doesnot spport the this
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DEV@tinder$123", {
    expiresIn: "7d"
  });

  return token;
};

//storing password encryption in userSchema
userSchema.methods.getVerifiedPassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  // const validatePassword = await bcrypt.compare(password, user.password); wrong

  const validatePassword = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return validatePassword;
};

//create mongoose model
// const model = mongoose.model(modelName, Schema)
// const userModel = mongoose.model("User", userSchema);

// module.exports = userModel;

//or

module.exports = mongoose.model("User", userSchema);
