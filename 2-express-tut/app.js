const express = require("express");
const morgan = require("morgan");
const app = express();
let { people } = require("./data");

app.use(morgan("tiny"));

// Static assets
app.use(express.static("./methods-public"));

// Parse form data
app.use(express.urlencoded({ extended: false }));
// Parse JSON data
app.use(express.json());
// Get all people
app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});
// post the new person request and open a new page /api/people
app.post("/api/people", (req, res) => {
  res.status(201).send("Successfully");
});

// post request and response to  new page /login
app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please Provide Credential"); // send back a response
});

app.listen(5000, () => {
  console.log("Server is listing on port 5000......");
});
