const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const user = await User.create({ ...req.body }); // create a new user
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    "jwtPrivateKey",
    { expiresIn: "30d" }
  ); // create a token
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token });
};

const login = async (req, res) => {
  res.send("login User");
};

module.exports = {
  register,
  login,
};
