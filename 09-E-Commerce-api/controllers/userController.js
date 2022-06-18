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
  const { password } = req.body;
};

const updateUserAndPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomAPIError.BadRequestError(
      "Please provide both values for the old and new password"
    );
  }

  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomAPIError.UnauthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ MSG: "Success Password changed" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserAndPassword,
};
