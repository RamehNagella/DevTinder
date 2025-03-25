const express = require("express");
const router = express.Router();

const { userAuth } = require("../middlewares/auth");

router.post("/request", userAuth, async (req, res) => {
  const user = req.body;

  res.status(200).json(user.firstName + " send friend request");
});

router.get("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  res.status(200).json(user.firstName + " was sent connection request");
});

module.exports = router;
