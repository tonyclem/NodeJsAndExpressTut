// to know more about mongoose schema, go to: https://mongoosejs.com/docs/models.html
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  // set the schema with build in validations and set the type to be string, required true not empty, to trim the empty space, unique, etc // completed to be false by default
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [20, "Name must be less than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
