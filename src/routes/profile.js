const express = require("express");
const router = express.Router();

const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const { validateEditProfileData } = require("../utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");

router.get("/profile/view", userAuth, async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
});

//create UPDATE api

router.patch("/profile/edit", userAuth, async (req, res) => {
  // take user entered update details
  // restrict the update list to one some fields or dont give permission to update emailId and password
  // verify the user entered update list
  // to update the database data with new data use mongodb query
  // save updated data
  // send response

  try {
    console.log(">>", validateEditProfileData(req));

    if (!validateEditProfileData(req)) {
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
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.status(200).json({
      message: `${loggedInUser.firstName} your profile was updated successfully.`,
      data: loggedInUser
    });
  } catch (err) {
    res.status(400).json("ERROR: " + err.message);
  }
});

router.patch("/profile/password", async (req, res) => {
  //read the user entered password from UI
  //validate the password weather it is strong or not
  // find the user document with emailId
  //then update the stored password with new password
  // then save the userDocument

  try {
    const { emailId, password } = req.body;

    if (!validator.isStrongPassword(password)) {
      throw new Error("Plaese Enter Strong password.");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findOneAndUpdate(
      { emailId: emailId },
      { password: hashPassword }
    );

    await updatedUser.save();

    res
      .status(200)
      .json({ message: "Password updated successfully.", data: updatedUser });
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
