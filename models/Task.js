const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 1000
  },
  dueDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value >= new Date();
      },
      message: 'Due date must be in the future'
    }
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  Status: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },updatedAt: {
    type: Date,
    default: Date.now
  }
});


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
