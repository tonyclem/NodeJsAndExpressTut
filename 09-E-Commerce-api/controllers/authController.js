const User = require("../models/User");

const register = async (req, res) => {
  res.send("Hello register");
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
