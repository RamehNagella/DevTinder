const express = require("express");

const app = express();

// app.use("/", (req, res) => {
//   res.send("hello from dashboard");
// });

app.use("/test", (req, res) => {
  res.send("Hello from server!");
});

app.use("/hello", (req, res) => {
  res.send("hello hello");
});

app.use("/data", (req, res) => {
  res.send("data available here");
});

// app.listen(3000);
app.listen(7777, () => {
  console.log("server connected succssfully and listening to the port.");
});
