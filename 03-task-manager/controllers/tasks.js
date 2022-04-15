// export from the models Schemas folder
const Task = require("../models/Task");

// talk this latter with different options we have to use
const getAllTasks = async (req, res) => {
  try {
    // we using find({}) to get all the tasks
    const tasks = await Task.find({});
    // res.status(200).json({ tasks });
    res.status(200).json({ tasks, amount: tasks.length });
    //  res.status(200).json({status: "success", data: {tasks, nbHits: tasks.length}})
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// this function is to create a new task
const createTask = async (req, res) => {
  // passing the data to the data store
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// this going to get the single task by id and return it values
const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    // findById is a mongoose method to get the single task by _id and return it values
    const task = await Task.findOne({ _id: taskID });
    // if the task is not found
    if (!task) {
      return res.status(404).json({ msg: `No task With that id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// this function is to delete the task by id
const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    // findByIdAndDelete is a mongoose method to get the single task by _id and delete it
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with that id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
    // res.status(500).send(); // same as above
    // res.status(500).json({ task: null, status: "success" }); // or this
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ msg: `No task with that id: ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
