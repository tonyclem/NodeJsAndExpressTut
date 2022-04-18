const getAllJobs = async (req, res) => {
  res.send("Get all Jobs");
};

const getJob = async (req, res) => {
  res.send("get Job");
};

const createJob = async (req, res) => {
  res.send("create Job");
};

const updateJob = async (req, res) => {
  res.send("create Job");
};

const deleteJob = async (req, res) => {
  res.send("delete Job from User");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
