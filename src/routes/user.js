const express = require("express");
const router = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

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

    if (!connectionRequests) {
      return res.status(404).json("Requests not found.");
    }

    //ONLY FINDING INTERESTED USERS INFO (avoiding all other connection request information.)
    const interestedUsers = connectionRequests.map((doc) => doc.fromUserId);

    res.status(200).json({
      message: "interested users data fetched successfully!! ",
      data: interestedUsers
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// get all the connections you have which are accepted requests
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
module.exports = router;
