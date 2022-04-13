const express = require("express");
const app = express();
const morgan = require("morgan");
const authorize = require("./authorize");

//  req => middleware
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next();
};

// this use is for all the routes and the middleware / this api we be applied to all the routes
// app.use("/api", logger);
// app.use([logger, authorize]);
// app.use(express.static("./public"))

// morgan is a middleware that logs the request in the console
app.use(morgan("tiny"));
app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.get("/api/products", (req, res) => {
  res.send("Products");
});
app.get("/api/items", (req, res) => {
  console.log(req.user);
  res.send("Items");
});

app.listen(5000, () => {
  console.log("Server is listing on port 5000......");
});
