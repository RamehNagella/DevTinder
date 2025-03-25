const express = require("express");
const router = express.Router();

const {
  validateSignUpData,
  validateLoginData
} = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/signup", async (req, res) => {
  //take the user details llike email, pasword from req body
  // validate req
  // hash the password using bcryptjs package to store the password in encrypted way
  // save the user details
  // send the reponse

  try {
    const { firstName, lastName, emailId, password } = req.body;

    if (validateSignUpData(req)) {
      throw new Error("Invalid Credienatials.");
    }

    const hashPW = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPW
    });

    await user.save();

    res.status(200).json("user data saved successfully.");
  } catch (err) {
    res.status(400).json("ERROR: " + err.message);
  }
});

router.post("/login", async (req, res) => {
  // extract user credenetails form req body
  // verify they are coming or not from req. body
  // validate credentials
  // decrypt the stored password
  // once password is verified,
  //  take the userId from database with the help of user emailId
  //  create a token with JWT
  //WITH JWT.sign(userData, secretekey, signature);
  //store the jwt token  in cookie(for better safety)
  //send the  cookie to store in the browser.
  // then provide the UI for the user

  const { emailId, password } = req.body;
  // console.log(emailId, password);

  try {
    validateLoginData(req);
    // console.log(validateLoginData(req));

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials.");
    }
    // const isPasswordValid = await bcrypt.compare(password, user.password);
  } catch (err) {
    res.status(400).json("ERROR: " + err.message);
  }
});

router.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now())
  });
  res.send("user logout!!");
});

module.exports = router;
