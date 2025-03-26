const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  // 1. read the status userIds from req
  // 2. make the new connection request instance
  // 3. add the required validation wherever it required
  // 4. save the connection request instance and send the response
  //  Validataions required
  //  i. This api should only allow for status of ignore and interested and for other statuses this api should not be used
  //  iv. one user can send one connection for one user (multiple times cannot be sent)
  //  iii. the request user and sending user should be present in the db
  //  ii. the request of fromUser and  toUser could not be the same
  //   v. request recieved user could not be sent the request again

  try {
    const fromUserId = req.user._id;
    const toUserId = new mongoose.Types.ObjectId(req.params.toUserId);
    const status = req.params.status;

    // console.log("fromUserId:", fromUserId);
    // console.log("toUserId:", toUserId);
    // console.log(fromUserId.toString() === toUserId.toString());

    // if (!toUserId || !fromUserId) {
    //   return res.status(404).json({ message: "Users was not found." });
    // }

    // avoid sending request to yourself
    if (fromUserId.toString() === toUserId.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot send request to yourself." });
    }

    //status allowed are ignore and interested
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status type: " + status });
    }

    // find weather toUser is already present in the db
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json("requested user was not found.");
    }

    //same user cannot send multiple requests
    // request recieved user could not be send connection again to the sender
    const existingUser = await ConnectionRequest.findOne({
      $or: [
        { fromUserId: fromUserId, toUserId: toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Connection request already exists" });
    }

    const data = await new ConnectionRequest({ fromUserId, toUserId, status });

    await data.save();

    res.status(200).json(req.user.firstName + " was sent connection request ");
  } catch (err) {
    res.status(400).json("ERROR: " + err.message);
  }
});

router.get("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  res.status(200).json(user.firstName + " was sent connection request");
});

module.exports = router;
