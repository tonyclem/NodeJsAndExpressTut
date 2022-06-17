const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const CustomAPIError = require("../errors");

const register = async (req, res) => {
  const { email } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomAPIError.BadRequestError("Email Already exists");
  }

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("Hello login");
};

const logout = async (req, res) => {
  res.send("Hello logout");
};

module.exports = {
  register,
  login,
  logout,
};
