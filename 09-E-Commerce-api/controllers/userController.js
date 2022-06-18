const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users, amount: users.length });
};

const getSingleUser = async (req, res) => {
  const { id: userID } = req.params;
  const user = await User.findOne({ _id: userID }).select("-password");
  if (!user) {
    throw new CustomAPIError.NotFoundError("Not Found");
  }
  res.status(StatusCodes.CREATED).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ user: req.user });
};

const updateUser = async (req, res) => {
  res.send(req.body);
};

const updateUserAndPassword = async (req, res) => {
  res.send(req.body);
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserAndPassword,
};
