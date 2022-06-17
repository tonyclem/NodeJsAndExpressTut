const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const CustomAPIError = require("../errors");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomAPIError.BadRequestError("Email Already exists");
  }

  //   first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ email, name, password, role });
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
