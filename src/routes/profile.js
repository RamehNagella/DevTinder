const express = require("express");
const router = express.Router();

const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const { validateEditProfileData } = require("../utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/profile/view", userAuth, async (req, res) => {
  // const { emailId } = req.body;
  // const user = await User.findOne({ emailId: emailId });
  const user = req.user;
  res
    .status(200)
    .json({ message: user.firstName + " your data is here", user });
});

//create UPDATE api

router.patch("/profile/edit", userAuth, async (req, res) => {
  // console.log("/profile/edit", req.body);
  // take user entered update details
  // restrict the update list to one some fields or dont give permission to update emailId and password
  // verify the user entered update list
  // to update the database data with new data use mongodb query
  // save updated data
  // send response

  try {
    if (!validateEditProfileData(req)) {
      console.log(true);
      throw new Error("Invalid Edit Request.");
    }

    const loggedInUser = req.user;

    // const update = await User.findByIdAndUpdate(
    //   { _id: loggedInUser._id },
    //   {
    //     firstName: firstName,
    //     lastName: lastName,
    //     age: age,
    //     photoUrl: photoUrl,
    //     about: about,
    //     skills: skills
    //   }
    // );

    // //or
    // console.log(req.body);

    Object.keys(req.body).forEach((key) => {
      // console.log("key", key);
      loggedInUser[key] = req.body[key];
    });

    // console.log("loggedIN", loggedInUser);
    await loggedInUser.save();

    res.status(200).json({
      message: `${loggedInUser.firstName} your profile was updated successfully.`,
      loggedInUser
    });
  } catch (err) {
    res.status(400).json("ERROR: " + err.message);
  }
});

//updating the password.
router.patch("/profile/password", userAuth, async (req, res) => {
  //read the user entered password from UI
  //validate the password weather it is strong or not
  // find the user document with emailId
  //then update the stored password with new password
  // then save the userDocument

  try {
    const user = await User.findById(req.user._id);
    // console.log(user);
    if (!user) {
      throw new Error("User not found.");
    }

    const { emailId, oldPassword, newPassword } = req.body;

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Plaese Enter Strong password.");
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      throw new Error("Incorrect old password.");
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    // const updatedUser = await User.findByIdAndUpdate(
    //   { _id: req.user._id },
    //   { password: hashPassword }
    // );

    user.password = hashPassword;

    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    res.status(400).json("ERROR: " + err.message);
  }
});

router.get("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  res.status(200).json(user.firstName + " was sent connection request");
});
module.exports = router;

// router.get(
//   "/check",
//   userAuth,
//   async (req, res, next) => {
//     console.log("1");

//     next();

//     console.log("2");
//     res.send("connection1");
//   },
//   async (req, res) => {
//     console.log(req.user);
//     console.log(3);
//     res.send("connection2");
//   }
// );
