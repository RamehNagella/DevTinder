/*
const adminAuth = (req, res, next) => {
  console.log("Admin auth is getting check ");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";

  if (!isAdminAuthorized) {
    res.status(401).send("Unathorised request.");
    //once authorization failed request dont look for next route handlers for that don't write next() function inside this block
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User auth is getting check ");
  const token = "xyzabc";
  const isAdminAuthorized = token === "xyzabc";

  if (!isAdminAuthorized) {
    res.status(401).send("Unathorised request.");
    //once authorization failed request dont look for next route handlers for that don't write next() function inside this block
  } else {
    next();
  }
};
module.exports = {
  adminAuth,
  userAuth
};
*/

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  // //Read the token from the cookies
  // const cookies = req.cookies;
  // // Extract the jwt token
  // const  {token} = cookies; // or
  try {
    const { token } = req.cookies;
    // console.log("//", token);
    if (!token) {
      return res.status(401).json("Please Login");
      // throw new Error("Invalide token!!");
    }
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedToken);

    if (!decodedToken) {
      throw new Error("Invalide token!!");
    }

    const { _id } = decodedToken;
    const user = await User.findById(_id);
    // console.log("user", user);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth
};
