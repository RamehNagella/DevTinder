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
