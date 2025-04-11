const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName age about skills photoUrl";

//get all the pending connection requests for loggedInUser
// (the requests that were sent to you and have interested on you)
router.get("/user/requests/recieved", userAuth, async (req, res) => {
  // verify loggedIn user
  // retrieve the doccuments of connection requests that were sent to you
  // dont retrive the documents that you sent to others
  // get only the connections ONLY YOU HAVE INTERESTED, dont get who you are ignored
  // status : interested
  // toUserId(others sent connection request to loggedIn userId)
  // GET USER INFO INSTEAD OF CONNECTION INFO

  try {
    const loggedInUser = req.user;
    const loggedInUserId = loggedInUser._id;

    //get all the users on who you are interested from the connectionRequests
    //get users info instead of request info
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUserId,
      status: "interested"
    }).populate("fromUserId", USER_SAFE_DATA);
    // .populate("fromUserId","firstName lastName age about skills photoUrl")
    // .populate("fromUserId",["firstName", "lastName", "age", "about", "skills", "photoUrl"])

    // console.log("cr", connectionRequests);
    if (!connectionRequests) {
      return res.status(404).json("Requests not found.");
    }

    //ONLY FINDING INTERESTED USERS INFO (avoiding all other connection request information.)
    // const interestedUsers = connectionRequests.map((doc) => doc.fromUserId);
    // console.log("in", interestedUsers);
    res.status(200).json({
      message: "interested users data fetched successfully!! ",
      data: connectionRequests
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// get all the connections you have, which are accepted requests
router.get("/user/connections", userAuth, async (req, res) => {
  //here accepted requests meand
  // you send requests to others they have accepted
  // otheres sent requests to you - you accepted
  // dont retrieve the documents with status other than "accepted"
  // get those accepted users information
  try {
    const loggedInUser = req.user;
    const loggedInUserId = loggedInUser._id;

    //query to find all accepted request's users
    const acceptedUsers = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUserId, status: "accepted" },
        { toUserId: loggedInUserId, status: "accepted" }
      ]
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = acceptedUsers.map((doc) => {
      return doc.fromUserId._id.toString() !== loggedInUserId.toString()
        ? doc.fromUserId
        : doc.toUserId;
      //   if (doc.fromUserId._id.toString() !== loggedInUserId.toString()) {
      //     return doc.fromUserId;
      //   }
      //   if (doc.toUserId._id.toString() !== loggedInUserId.toString()) {
      //     return doc.toUserId;
      //   }
    });

    res.status(200).json({
      message: "all your accepted requests fetched!",
      data: data
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get all the users who are in application
router.get("/user/feed", userAuth, async (req, res) => {
  // get all the users who are using app
  // you dont have to get
  //    already connection's profiles you have(accepted)
  //    already you ignored connectionRequest's profiles
  //    your own prfile you
  //    you interested profiles also you dont you have to show again when you fetch for new profiles
  try {
    const loggedInUser = req.user;
    const loggedInUserId = loggedInUser._id;
    const { page, limit } = req.query;
    const skip = (page - 1) * limit || 0;

    // const notAllowedStatus = ["accepted", "ignored", "interedted"];
    // find all the requsts(accepted/ignored/interested )
    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }]
    }).select("fromUserId toUserId");
    // .populate("fromUserId", "firstName")
    // .populate("toUserId", "firstName");

    const hideUsersFromFeed = new Set();

    connections.forEach((doc) => {
      hideUsersFromFeed.add(doc.fromUserId._id.toString());
      hideUsersFromFeed.add(doc.toUserId._id.toString());
      // hideUsersFromFeed.has(doc.fromUserId) ? hideUsersFromFeed.add(doc.fromUserid) : "";
      // hideUsersFromFeed.has(doc.toUserId) ? hideUsersFromFeed.add(doc.toUserId) : "";
      // // if (hideUsersFromFeed.has(doc.toUserId)) {
      // //   hideUsersFromFeed.add(doc.fromUserId);
      // // }
      // // hideUsersFromFeed.add(doc.toUserId);
    });

    // find all users except you, your connections(ignored/accepted/interested)
    const users = await User.find({
      $and: [
        {
          _id: {
            $nin: Array.from(hideUsersFromFeed).map(
              (id) => new mongoose.Types.ObjectId(id)
            )
          }
        },
        { _id: { $ne: loggedInUserId } }
      ]
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);
    // console.log("users", users);
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
