const express = require("express");
const app = express();

const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestHeader = require("./routes/request");
const userRouter = require("./routes/user");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser()); // to read the cookie

app.use("/", authRouter);
app.use("/", requestHeader);
app.use("/", profileRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection establised...");

    const server = app.listen(process.env.PORT, () => {
      console.log(
        "server connected succssfully and listening to the port 7777...."
      );
    });
    // ✅ Attach error handler
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error("❌ Port 7777 is already in use!");
      } else {
        console.error("❌ Server error:", err);
      }
    });
  })
  .catch((err) => {
    console.log("cannot connect databse!");
  });

/*
app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    // validate the req body (user Input)
    // const valid = validateSignUpData(req);
    // console.log(valid);//undefined when everything goes fine
    validateSignUpData(req);
    //hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    // console.log(hashPassword);
    // store the userdate with hashed password
    // const user = new User(req.body);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword
    });

    //save the user
    await user.save();
    //send the response
    res.status(200).send("User data saved successfully.");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
    //   if (err.name === "ValidationError") {
    //     // return res.status(400).json({ error: err.message });
    //     res.status(400).send("Error storing the user: " + err.message);
    //   }
    //   if (err.code === 11000) {
    //     return res
    //       .status(400)
    //       .send({ error: "Email already exists! Please use a different email." });
    //   }
    //   res.status(500).send({ error: "Internal Server Error" });
  }
});

//create login API
app.get("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    validateLoginData(req);

    // console.log(emailId, password);
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      // throw new Error("Email is not valid or Email is not present in the DB"); // which is wrong because we should not give the info about db data
      throw new Error("Invalide credentials!");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // in the parameters 1st one is userEnterd password from browser and 2nd one is password stored in database

    // const isPasswordValid = await user.getVerifiedPassword(password);

    if (isPasswordValid) {
      //create a token
      const token = await user.getJWT();
      console.log(">>", token);
      //add the token to cookie  and send the response back to the server
      // res.cookie("token", token);
      // res.cookie("token", token, {
      //   httpOnly: true, // Prevents JavaScript access
      //   secure: process.env.NODE_ENV === "production", // Secure in HTTPS
      //   sameSite: "Strict"
      // });
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000)
      });
      //7days cookie will expire

      res.send("Login Successfu!!");
    } else {
      // throw new Error("Invalid Password");
      throw new Error("Invalid Credentials!");
    }
  } catch (err) {
    res.status(400).send(" ERROR: " + err.message);
  }
});


//cookie will be sent to the user with token
//get profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    // //validate the cookie when profile api was called
    // // const cookie = req.cookie(); //cookie is not a funciton
    // // const cookie = req.cookie;
    // const cookies = req.cookies;
    // // console.log(cookie);//undefined we need a package to read the cookie sent from the server
    // console.log(cookies); //{ token: 'ahdlkfksdhkfhkjdhahdkj' }

    // //extract the token
    // const { token } = cookies;
    // console.log(token);

    // // verify the token
    // const decodedToken = jwt.verify(token, "DEV@tinder$123");
    // // console.log("///", decodedToken);
    // //extract the user INfo present inside the token
    // const { _id } = decodedToken;
    // console.log(_id);
    // //get the user data
    // const data = await User.findById(_id);
    // // console.log(data);
    // if (!data) {
    //   throw new Error("User does not exists");
    // }

    const user = req.user;

    // send RESPONSE (send the user document profile with the help user info)
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//make connection request
app.get("/sendConnectionRequest", userAuth, async (req, res) => {
  console.log("sending connection");
  const user = req.user;
  console.log(user);
  res.send(user.firstName + " was sent connection request");
});

/*
//getting single user data

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail }).exec();
    console.log("??", user);
    // ["userObje"];
    // if (user.length === 0) {
    //if find() method used
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

//Feed API -GET /feed -get all the users from the database

app.get("/feed", async (req, res) => {
  // const emailId = req.body

  try {
    const users = await User.find({});

    if (users.length === 0) {
      res.status(404).send("Users not found.");
    } else {
      res.status(200).send(users);
    }
  } catch (err) {
    res.status(500).send("Somthing went wrong.");
  }
});

//DELETE THE USER WITH userid
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  console.log("//", userId);

  try {
    // const userDelete = await User.findByIdAndDelete(userId);
    const userDelete = await User.findByIdAndDelete({ _id: userId });

    res.send("User deleeted successfully.");
  } catch (err) {
    res.status(500).send("something went wrong.");
  }
});

// UPDATE data of the user

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  // console.log(userId);
  // console.log(data);

  try {
    //restrict update to some fields
    const ALLOWED_UPDATES = ["photoUrl", "gender", "age", "skills", "about"];
    const isUpdateAllowed = Object.keys(data).every((k) => {
      // console.log("k", k);
      return ALLOWED_UPDATES.includes(k);
    });

    if (!isUpdateAllowed) {
      throw new Error("update not allowed.");
      // res.status(400).send("update not allowed");
    }
    //restricting no of updating field values to some number
    if (data?.skills.length > 10) {
      throw new Error("updating skills must not be more than 5");
    }
    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true
    });
    console.log(updatedUser);

    res.send("user data updated successfully.");
  } catch (err) {
    res.status(500).send("error updating the user: " + err.message);
  }
});

//update the user with email id

app.patch("/email", async (req, res) => {
  const email = "rs@gmail.com";
  const data = req.body;
  console.log(data);
  const userId = req.body.userId;
  try {
    //   const updatedUser = await User.findByIdAndUpdate(userId, {
    //     $unset: { age: 1 }
    //   });

    const updatedUser = await User.findOneAndUpdate({ emailId: email }, data, {
      returnDocument: "before"
    });

    console.log(updatedUser);

    res.send("User updated with emailId");
  } catch (err) {
    res.status(500).send("Somthing went wrong");
  }
});

*/
