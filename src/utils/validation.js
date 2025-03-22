const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  console.log(password);

  if (!firstName || !lastName) {
    throw new Error("user name not valid.");
  }
  //first name length, lastname length validation is done at userSchema level when we defining the schema
  //   else if (!emailId || !password) {
  //     throw new Error("Invalid email address");
  //   } it is not required because user will definately enters the email and all
  else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("plase enter the strong password.");
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

module.exports = { validateSignUpData, validateLoginData };
