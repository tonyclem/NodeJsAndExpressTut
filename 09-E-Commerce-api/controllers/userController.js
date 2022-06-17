const getAllUsers = async (req, res) => {
  res.send("Hello get all user");
};

const getSingleUser = async (req, res) => {
  res.send("Hello get single user");
};

const showCurrentUser = async (req, res) => {
  res.send("show current user");
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
