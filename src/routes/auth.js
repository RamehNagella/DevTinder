const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const { validator } = require("validator");

const {
  validateSignUpData,
  validateLoginData,
} = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { JsonWebTokenError } = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    //take the user details like email, pasword from req body
    const { firstName, lastName, emailId, password } = req.body;

    // validate req
    if (!validateSignUpData(req)) {
      throw new Error("Enter correct email or strong password");
    }

    // hash the password using bcryptjs package to store the password in encrypted way
    const hashPW = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPW,
    });

    const savedUser = await user.save();

    //directly logging into application after signup
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res
      .status(200)
      .json({ message: "user data saved successfully.", data: savedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  // Extract user credenetails form req body
  const { emailId, password } = req.body;
  try {
    validateLoginData(req);

    // Verify they are coming or not from req. body
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials.");
    }

    // Decrypt the stored password and verify
    const isPasswordValid = await user.getVerifiedPassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credientials.");
    }
    // Genearate the token using JWT
    const token = await user.getJWT();
    //Store the jwt token  in cookie(for better safety)
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    //send the  cookie to store in the browser.
    res.status(200).json({
      message: `${user.firstName} you can now explore here`,
      user,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/logout", async (req, res) => {
  // set cookie to null or expire the cookie time to logout
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("user logout!!");
});

//forgot password
//to create the api for forgot password we need to use 2 APIs
// one is for GENERATE THE JWT RESET TOKEN
// second is for VERIFY THE TOKEN & RESET NEW PASSWORD

// POST /forgot-password
// PATCH /reset-password

router.post("/forgot-password", async (req, res) => {
  try {
    // 1. take the user entered email
    const { emailId } = req.body;

    // 2. verify weather emailId is already exist or not in the database
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Enter correct emailId. ");
    }
    // 3. if exist generate a secure reset token
    const resetToken = await jwt.sign(emailId, process.env.JWT_SECRET, {
      expiresIn: 15 * 60 * 1000,
    });

    // Send the token via email (For now, logging it)
    // console.log(`Password Reset Token (Send via Email): ${resetToken}`);

    res.status(200).json({ message: "Reset token sent to email." });
  } catch (err) {
    res.status(400).json("ERROR: " + err.message);
  }
});

router.patch("/verify-token", async (req, res) => {
  // 5. then hash the password and store it in DB

  try {
    // 1.take the token and new password from req.body
    const { token, newPassword } = req.body;

    // 2. verify the token with secrete key which was used while creating reset token
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);

    // 3. then extact the emailId (userDetails) from verifiedToken
    const emailId = verifyToken.emailId;

    // 4. find the user document from db with extracted emailId
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid token or token was expired");
    }

    // 5.Validate the new password for strongness
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
