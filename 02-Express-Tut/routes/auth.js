const express = require("express");
const router = express.Router();

// post request and response to  new page /login
router.post("/", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please Provide Credential"); // send back a response
});

module.exports = router;
