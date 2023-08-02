const Task = require('../models/Task');
const User = require('../models/User');

// Mark a task as complete
exports.ChangeStatus = async (req, res) => {
  try {
    const taskId = req.params.task_id;
    const newStatus = req.body?.newstatus;
    if (newStatus !== true && newStatus !== false) {
        // validation error
        return res.status(400).json({ error: 'Invalid value for newStatus' });
      }
      const updatedTask = await Task.findOneAndUpdate(
        { _id: taskId },
        { Status: newStatus },
        { new: true } // This option returns the updated document
      );
  
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.status(200).json({ success: true, message: 'Update successful', task: updatedTask });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the status of the task' });
    }
  };

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.task_id;
    const title= req.body?.title;
    const description = req.body?.description;
    const dueDate = req.body?.dueDate;
    const priority = req.body?.priority;

      // Find the task by its ID
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      // Update the task fields if provided in the request body
      if (title!= undefined) {
        task.title = title;
      }
      if (description!= undefined) {
        task.description = description;
      }
      if (dueDate!= undefined) {
        task.dueDate = dueDate;
      }
      if (priority!= undefined) {
        task.priority = priority;
      }
      // Save the updated task to the database
      await task.save();
  
      res.json({ message: 'Task updated successfully', task });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Create a new task
exports.createTask = async (req, res) => {
  try {    
    const title= req.body?.Title;
    const description = req.body?.Description;
    const dueDate = req.body?.DueDate;
    const priority = req.body?.Priority;
    const userId = req.user;

    // Create a new task object
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
    });
    // Save the task to the database
    await task.save();
    await User.findByIdAndUpdate(userId, {
      $push: { todoList: task._id }
    })

    res.status(200).json({ success: true, message: 'Task created successfully', task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.task_id;
    const userId = req.user;
    
    
    // Remove the task from the database
    await Task.deleteOne({ _id: taskId });

    // Remove the task's ObjectId from the user's TodoList
    await User.findByIdAndUpdate(userId, {
      $pull: { todoList: taskId }
    });

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


exports.viewTasks = async (req, res) => {
  try
  {
  const userId = req.user;

    // Find the user by ID
    const currentUser = await User.findById(userId);

    // Get the list of task IDs from the user's TodoList
    const taskIds = currentUser.todoList;

    // Find all the tasks in the Task model with IDs in the taskIds array
    const tasks = await Task.find({ _id: { $in: taskIds } });

    res.status(200).json({ success: true, message: 'Tasks retrieved successfully', tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error', error: err });
  }
};

