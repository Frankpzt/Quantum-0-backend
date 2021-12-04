const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const taskSchema = new Schema({
  taskid: {
    type: String,
  },
  name: {
    type: String,
    default: "New Task",
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
  },
  checked: {
    type: Boolean,
  },
  assignee: {
    type: String,
  },
  reporter: {
    type: String,
  },
  note: {
    type: String,
  },
});

taskSchema.pre("save", function(next) {
    this.taskid = uuidv4();
    next();
})

module.exports = model("Task", taskSchema);
