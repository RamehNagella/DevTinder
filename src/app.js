// const express = require("express");

// const app = express();
/*
// app.use("/", (req, res) => {
//   res.send("hello from dashboard");
// });

app.use("/hello", (req, res) => {
  res.send("hello hello");
});
app.use("/test", (req, res) => {
  res.send("Hello from server!");
});

// app.use("/hello/2", (req, res) => {
//   res.send("fsgk;lsdlkg");
// });

// app.use("/", (req, res) => {
//   res.send("hello from dashboard");
// });

app.use("/data", (req, res) => {
  res.send("data available here");
});
*/

/*
const express = require("express");

const app = express();
//This will only handle GET call to /user path
app.get("/user", (req, res) => {
  // res.send("Hello from server!");
  res.send({ firstName: "Akshay", lastName: "Saini" });
});

//This will only handle POST call to /user path
app.post("/user", (req, res) => {
  //saving data to db
  res.send("Data saved successfully.");
});

//This will only handle PUT api call to /user path
app.put("/user", (req, res) => {
  res.send("Data update successfully.");
});
//This will only handle PATCH API call to /user path
app.patch("/user", (req, res) => {
  res.send("Data modified successfully.");
});

//This will only handle DELETE call to /user path
app.delete("/user", (req, res) => {
  res.send("Data deleted.");
});

//This will match all th HTTP method API calls to /data path
// app.use("/data", (req, res) => {
//   res.send("data available here");
// });

//ADVanced routing to api
// works only for /abc
app.get("/abc", (req, res) => {
  res.send("advanced routing technique");
});
// works for /abc, /ac
app.get("/ab?c", (req, res) => {
  res.send("advanced routing technique ab?c");
});

// works for /abc /abbc, /abbbbbc, /abbbbbbbbc wont work for /ab1c /ab234sfsdc
app.get("/ab+c", (req, res) => {
  res.send("advanced routing technique ab+c");
});

//works for /abcd, /abanthingcd, /abdlkjfksjdflkcd/
app.get("/ab*cd", (req, res) => {
  res.send("advanced routing technique ab*cd");
});

// bc optional, works for /ad
app.get("/a(bc)?d", (req, res) => {
  res.send("advanced routing technique a(bc)?d");
});

// works /abcbcbcd, /abcbcbcbcbcbcd
app.get("/a(bc)+d", (req, res) => {
  res.send("advanced routing technique a(bc)+d");
});

// // works for any route  if it has "a" in it like /car /jar
// app.get(/a/, (req, res) => {
//   res.send("advanced routing technique /a/");
// });

//works for any route if it has fly in between route string /butterfly
app.get(/.*fly$/, (req, res) => {
  res.send("advanced routing technique /.*fly&/");
});

//DYNAMIC ROUTES
//accessing userId (http://localhost:7777/admin?userId=101)
app.get("/admin", (req, res) => {
  console.log(req.query); //{ userId: '101' }
  res.send("advanced routing technique /admin?userId=101");
});
//MAKING ROUTES DYNAMIC(: with the help of colon we make dynamic)
//with req.params we will get userDetails
//http://localhost:7777/admin/102
app.get("/admin/:userId", (req, res) => {
  console.log(req.query); //{}
  console.log(req.params); //{ userId: '102' }
  res.send("getting user details from the routes path.");
});

app.get("/admin/:userId/:name/:password", (req, res) => {
  console.log(req.query); //{}
  console.log(req.params); //{ userId: '102', name: 'akshay', password: 'tester' }
  res.send("getting user details from the routes path.");
});
// app.listen(3000);
app.listen(7777, () => {
  console.log("server connected succssfully and listening to the port.");
});

*/
/*

const express = require("express");

const app = express();

// app.use("/user", (req, res) => {
//   res.send("Route Handler 1");
// });

// app.use("/user", (req, res) => {});
app.use(
  "/user",
  (req, res) => {
    console.log("Handling route user1!");
    res.send("1st Response");
  },
  (req, res) => {
    console.log("Handling route user2!");
    res.send("2nd Response");
  }
);

app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling route user1!");
    // res.send("1st Response");
    next();
  },
  (req, res) => {
    console.log("Handling route user2!");
    res.send("2nd Response");
    console.log("Handling route user21!"); //it doesnot print
  }
  );
  // Handling route user1!
  // Handling route user2!
  // Handling route user21!
  
  app.use(
    "/user",
    (req, res, next) => {
      console.log("Handling route user1!");
      res.send("1st Response");
      next();
    },
    (req, res) => {
      console.log("Handling route user2!");
      res.send("2nd Response");
      console.log("Handling route user21!"); //it doesnot print
  }
  );
  // Handling route user1!
  // Handling route user2!
  // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  
  
  app.use(
    "/user",
    (req, res, next) => {
      console.log("Handling route user1!");
      next();
      res.send("1st Response");
  },
  (req, res) => {
    console.log("Handling route user2!");
    res.send("2nd Response");
    // console.log("Handling route user21!"); //it doesnot print
  }
);
// Handling route user1!
// Handling route user2!
// Handling route user21!
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
// Error at     at /home/admin1/Desktop/DevTinder/src/app.js:194:9

app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling route user1!");
    next();
    console.log("Handling route user1!");
    console.log("Handling route user1!");

    res.send("1st Response");
  },
  (req, res) => {
    console.log("Handling route user2!");
    res.send("2nd Response");
    console.log("Handling route user21!"); //it doesnot print
  }
  );
  // Handling route user1!
  // Handling route user2!
  // Handling route user21!
  // Handling route user11!
  // Handling route user12!
  // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling route user1!");
    next();
  },
  (req, res, next) => {
    console.log("Handling route user2!");
    // res.send("2nd Response");

    next();
  },
  (req, res, next) => {
    console.log("Handling route user3!");
    next();
  },
  (req, res, next) => {
    console.log("Handling route user4!");
    res.send("4th Response");
    next();
  }
);
// Handling route user1!
// Handling route user2!
// Handling route user3!
// Handling route user4!
let rH = "request Handler";
app.use("/user", rH, rH2, rH3, rH4, rH5, rH6);
app.use("/user", [rH, rH2, rH3, rH4, rH5, rH6]);
app.use("/user", rH, rH2, rH3, [rH4, rH5, rH6]);
app.use("/user", [rH, rH2, rH3], rH4, rH5, rH6);
All are work in the same way and gives same output

app.use("/user", [
  (req, res, next) => {
    console.log("Handling route user1!");
    next();
  },
  (req, res, next) => {
    console.log("Handling route user2!");
    // res.send("2nd Response");

    next();
  },
  (req, res, next) => {
    console.log("Handling route user3!");
    next();
  },
  (req, res, next) => {
    console.log("Handling route user4!");
    res.send("4th Response");
    // next();
  }
]);

*/

//EXPRESS WORK FLOW

/*

app.use("/", (req, res, next) => {
  res.send("Handling / route");
  // next();
});

app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling route user1!");
    res.send("1st Response");

    next();
  },
  (req, res, next) => {
    console.log("Handling route user2!");
    res.send("2nd Response");

    next();
  }
);
*/
/*
app.get("/admin/getAllData", (req, res, next) => {
  //Logic for checking if the request is authorized
  const token = "xdsfdyz";
  const isAdminAuthorized = token === "xyz";

  if (isAdminAuthorized) {
    res.send("all Data sent.");
  } else {
    res.status(401).send("Unauthorised request.");
  }
});
app.get("/admin/deleteUser", (req, res, next) => {
  //Logic for checking if the request is authorized
  const token = "xdsfdyz";
  const isAdminAuthorized = token === "xyz";

  if (isAdminAuthorized) {
    res.send("all Data sent.");
  } else {
    res.status(401).send("Unauthorised request.");
  }
  res.send("all Data sent.");
});
*/
//HANDLE Auth Middleware all request GET, POST,PUT,DELET,PATCH
// app.use()
// app.all() both are work for all the methods but they have some difference between them

//

//
/*
const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

// app.use("/admin", (req, res, next) => {
//   console.log("Admin auth is getting check ");
//   const token = "xyz";
//   const isAdminAuthorized = token === "xyz";

//   if (!isAdminAuthorized) {
//     res.status(401).send("Unathorised request.");
//     //once authorization failed request dont look for next route handlers for that don't write next() function inside this block
//   } else {
//     next();
//   }
// });

//the above middle ware can be written as below
app.use("/admin", adminAuth);

// this login api doesnot need in authorization
app.post("/user/login", (req, res) => {
  res.send("User logged in successfully.");
});
app.get("/user", (req, res, next) => {
  console.log("user1");
  res.send("User Data sent");
});
app.get("/user/data", (req, res, next) => {
  console.log("user2");
  res.send("User Data");
});

app.get("/admin/getAllData", adminAuth, (req, res, next) => {
  res.send("all Data sent.");
});
app.get("/admin/deleteUser", adminAuth, (req, res, next) => {
  res.send("all Data deleted.");
});
app.listen(7777, () => {
  console.log("server connected succssfully and listening to the port.");
});
*/

/*

//ERROR HANDLING

const express = require("express");

const app = express();

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("Somthing went wrong.");
//   }
// });
//
// //This is the graceful way of handling the error

// app.get("/getUserData", (req, res, next) => {
//   //Login of DB call and get user data

//   throw new Error("random error thrown");
//   res.send("User data sent");
// });
//this is not the good wat of handling the error
// app.use("path", (err,req,res,next)=>{})
// 1st parameter is error argument
//last argument must be next

app.get("/getUserData", (req, res, next) => {
  try {
    //Login of DB call and get user data

    throw new Error("random error thrown");
    res.send("User data sent");
  } catch (err) {
    res.status(500).send("Some error contact support team.");
  }
});
// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("Somthing went wrong.");
//   }
// });
//Always write error code "/" route so that it matches all the routes that starts with /
// Always write error code at the end of the all the routes so that it handles error gracefully.

// app.get("/user", (req, res, next) => {
//   console.log("user1");
//   res.send("User Data sent");
// });
// app.get("/user/data", (req, res, next) => {
//   console.log("user2");
//   res.send("User Data");
// });

app.use("/user", (req, res, next) => {
  console.log("/ route written on the top");
  res.send("Respons1");
});
app.use("/user/data", (req, res) => {
  console.log("middleware 2");
  res.send("Respons2");
});
// app.use("/", (req, res, next) => {
//   console.log("/ route written on the top");
//   res.send("Respons1");
//   next();
// });
app.listen(7777, () => {
  console.log("server connected succssfully and listening to the port.");
});
*/
/*
const express = require("express");

const app = express();

app.use("/", (err, req, res, next) => {
  if (err) {
    //log your error
    res.status(500).send("Somthing went wrong.");
  }
});

app.get("/getUserData", (req, res, next) => {
  try {
    //Login of DB call and get user data

    throw new Error("random error thrown");
    res.send("User data sent");
  } catch (err) {
    res.status(500).send("Some error contact support team.");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    //log your error
    res.status(500).send("Somthing went wrong.");
  }
});

app.listen(7777, () => {
  console.log("server connected succssfully and listening to the port.");
});
*/
const express = require("express");
// require("./config/database");
const connectDB = require("./config/database");
//download userSchema modelfile
const User = require("./models/user");
const app = express();

//create API (to store the user data on databse);

/*
app.post("/signup", async (req, res) => {
  //create user info object
  // const userObj = {
  //   firstName: "Akshay",
  //   lastName: "Saini",
  //   emailId: "akshay@saini.com",
  //   password: "1234"
  // };
  // //create new user with above data
  // // create new Instance
  // // const user = new User(userObj);
  // // the above lines are also can be wrtten as

  const user = new User({
    firstName: "Akshay",
    lastName: "Saini",
    emailId: "akshay@saini.com",
    password: "1234"
  });

  //save the user data  (.save gives a promise hence await is used instead of then and catch)
  await user.save();
  // then send the  response to the database
  res.send("user added successfully.");
*/
/*
  //with error handling and all the clean way of writing above code is

  const user = new User({
    firstName: "Virat",
    lastName: "Kohli",
    emailId: "virat@kohli.com",
    password: "virat@123"
  });

  try {
    await user.save();
    res.status(200).send("user added successfully.");
  } catch (err) {
    res.status(500).send("Error saving the user: ", err.message);
  }
});
*/

app.use(express.json());
//storing the user data Dynamically
app.post("/signup", async (req, res) => {
  //reading user data sent from clien
  // console.log(req.body);//undefined
  //because to read json data we need express.json() middleware
  console.log(req.body);
  //create new Instance
  const user = new User(req.body);

  try {
    //save the user
    await user.save();
    //send the response
    res.status(200).send("User data saved successfully.");
  } catch (err) {
    res.status(400).send("Error storing the user: " + err.message);
  }
});

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

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  // console.log(data);
  try {
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

connectDB()
  .then(() => {
    console.log("Database connection establised...");
    app.listen(7777, () => {
      console.log("server connected succssfully and listening to the port.");
    });
  })
  .catch((err) => {
    console.log("cannot connect databse!");
  });
