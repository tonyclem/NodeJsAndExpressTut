const express = require("express");
const path = require("path");
const Members = require("./Members");

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
  next();
};

app.use(logger);

// Gets All Members
app.get("/api/member", (req, res) => {
  res.json(Members);
});

// this get all the element in public files and use it
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
