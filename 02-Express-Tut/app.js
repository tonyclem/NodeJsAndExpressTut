const express = require("express");
const morgan = require("morgan");
const app = express();

const people = require("./routes/people");
const auth = require("./routes/auth");

app.use(morgan("tiny"));

// Static assets
app.use(express.static("./methods-public"));

// Parse form data
app.use(express.urlencoded({ extended: false }));
// Parse JSON data
app.use(express.json());

// Routes
app.use("/api/people", people);

// Authorize
app.use("/login", auth);

// app.listen(5000, () => {
//   console.log("Server is listing on port 5000......");
// });
