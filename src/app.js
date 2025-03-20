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
app.use("/data", (req, res) => {
  res.send("data available here");
});
// app.listen(3000);
app.listen(7777, () => {
  console.log("server connected succssfully and listening to the port.");
});
