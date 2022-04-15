// send json
const express = require("express");
const app = express();
const response = require("./data");

app.get("/", (req, res) => {
  res.json(response);
});

app.listen(5000, () => {
  console.log("Server is listing on port 5000......");
});
