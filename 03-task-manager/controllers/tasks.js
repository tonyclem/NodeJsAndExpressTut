const getAllTasks = (req, res) => {
  res.send("all items in files ");
};

const createTask = (req, res) => {
  res.json(req.body);
};

const getTask = (req, res) => {
  res.send("get Single task");
};

const updateTask = (req, res) => {
  res.send("Update Tasks");
};

const deleteTask = (req, res) => {
  res.send("Delete Tasks");
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
