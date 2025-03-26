const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  // console.log(password, firstName, lastName, emailId);

  // console.log(validator.isEmail(emailId));
  if (!firstName || !lastName) {
    return false;
  }
  //first name length, lastname length validation is done at userSchema level when we defining the schema
  //   else if (!emailId || !password) {
  //     throw new Error("Invalid email address");
  //   } it is not required because user will definately enters the email and all
  else if (!validator.isEmail(emailId)) {
    // console.log(validator.isEmail(emailId));
    // throw new Error("Email is not valid.");
    return false;
  } else if (!validator.isStrongPassword(password)) {
    // console.log("true");
    // throw new Error("please enter the strong password.");
    return false;
  } else {
    return true;
  }
};

const validateLoginData = (req) => {
  const { emailId, password } = req.body;

  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid Credetials");
  } else if (!emailId || !password) {
    throw new Error("Invalid Credentials");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "photoUrl",
    "about",
    "skills"
  ];

  const isUpdateAllowed = Object.keys(req.body).every((key) =>
    allowedEditFields.includes(key)
  );
  // console.log("//", isUpdateAllowed);
  if (!isUpdateAllowed) {
    throw new Error("Enter correct data");
  }

  return isUpdateAllowed;
};

module.exports = {
  validateSignUpData,
  validateLoginData,
  validateEditProfileData
};
