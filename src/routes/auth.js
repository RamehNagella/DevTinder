const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const { validator } = require("validator");

const {
  validateSignUpData,
  validateLoginData
} = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { JsonWebTokenError } = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  //take the user details llike email, pasword from req body
  // validate req
  // hash the password using bcryptjs package to store the password in encrypted way
  // save the user details
  // send the reponse

  try {
    const { firstName, lastName, emailId, password } = req.body;

    // if (validateSignUpData(req)) {
    //   throw new Error("Invalid Credienatials.");
    // }
    if (!validateSignUpData(req)) {
      throw new Error("Enter correct email or strong password");
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
    // console.log(user);

    if (!user) {
      throw new Error("Invalid credentials.");
    }
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.getVerifiedPassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid credientials.");
    }
    const token = await user.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000)
    });

    res
      .status(200)
      .json({ message: `${user.firstName} you can now explore here` });
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

//forgot password
//to create the api for forgot password we need to user 2 APIs
// one is for GENERATE THE JWT RESET TOKEN
// second is for VERIFY THE TOKEN & RESET NEW PASSWORD

// POST /forgot-password
// PATCH /reset-password

router.post("/forgot-password", async (req, res) => {
  // 1. take the user entered email
  // 2. verify weather emailId is already exist or not in the database
  // 3. if exist generate a secure reset token
  // 4. send the token to email(or display it for now)
  try {
    const { emailId } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Enter correct emailId. ");
    }
    const resetToken = await jwt.sign(emailId, "Dev@tinder$123", {
      expiresIn: 15 * 60 * 1000
    });

    // Send the token via email (For now, logging it)
    console.log(`Password Reset Token (Send via Email): ${resetToken}`);

    res.status(200).json({ message: "Reset token sent to email." });
  } catch (err) {
    res.status(400).json("ERROR: " + err.message);
  }
});

router.patch("/verify-token", async (req, res) => {
  // 1.take the token and new password from req.body
  // 2. verify the token with secrete key which was used while creating reset token
  // 3. then extact the emailId (userDetails) from verifiedToken
  // 4. find the document from db with extracted emailId
  // 4. validate the new password for strongness
  // 5. then hash the password and store it in DB

  try {
    const { token, newPassword } = req.body;

    const verifyToken = await jwt.verify(token, "Dev@tinder$123");
    const emailId = verifyToken.emailId;

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid token or token was expired");
    }

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Enter strong password.");
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashPassword;

    await user.save();

    res.status(200).json(`${user.firstName} your password was reset!!!`);
  } catch (err) {
    res.status(400).json("ERROR: " + err.message);
  }
});
module.exports = router;
