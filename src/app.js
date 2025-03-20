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

const express = require("express");

const app = express();

// app.use("/user", (req, res) => {
//   res.send("Route Handler 1");
// });

// app.use("/user", (req, res) => {});
/*
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
*/
app.use("/user", rH, rH2, rH3, rH4, rH5, rH6);
app.use("/user", [rH, rH2, rH3, rH4, rH5, rH6]);
app.use("/user", rH, rH2, rH3, [rH4, rH5, rH6]);
app.use("/user", [rH, rH2, rH3], rH4, rH5, rH6);
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

// 4th Response
app.listen(7777, () => {
  console.log("server connected succssfully and listening to the port.");
});
