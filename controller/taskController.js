const Task = require('../models/Task');

// Mark a task as complete
exports.markTaskAsComplete = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Find the task by its ID
    const task = await Task.findById(taskId);

    // Update the isCompleted property of the task to true
    task.isCompleted = true;
    const savedTask = await task.save();

    res.status(200).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while marking the task as complete' });
  }
};

// Mark a task as incomplete
exports.markTaskAsIncomplete = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Find the task by its ID
    const task = await Task.findById(taskId);

    // Update the isCompleted property of the task to false
    task.isCompleted = false;
    const savedTask = await task.save();

    res.status(200).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while marking the task as incomplete' });
  }
};

// Update the title of a task
exports.updateTaskTitle = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title } = req.body;

    // Find the task by its ID and update the title
    const updatedTask = await Task.findByIdAndUpdate(taskId, { title }, { new: true });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the task title' });
  }
};

// Update the description of a task
exports.updateTaskDescription = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { description } = req.body;

    // Find the task by its ID and update the description
    const updatedTask = await Task.findByIdAndUpdate(taskId, { description }, { new: true });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the task description' });
  }
};

// Update the due date of a task
exports.updateTaskDueDate = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { dueDate } = req.body;

    // Find the task by its ID and update the due date
    const updatedTask = await Task.findByIdAndUpdate(taskId, { dueDate }, { new: true });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the task due date' });
  }
};
