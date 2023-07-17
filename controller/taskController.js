const Task = require('../models/Task');
const User = require('../models/User');

// Mark a task as complete
exports.ChangeStatus = async (req, res) => {
  try {
    const taskId = req.params;
    const newStatus = req.body?.newstatus;
    if (newStatus !== true && newStatus !== false) {
        // validation error
        return res.status(400).json({ error: 'Invalid value for newStatus' });
      }
    // Find the task by its ID
    const task = await Task.findById(taskId);
    if (task.Status == newStatus){
        return res.status(400).json({ error: 'Already Updated' });
    }
    // Update the isCompleted property of the task to true
    task.Status = newStatus;
    const savedTask = await task.save();

    res.status(200).json({ success: true, message: 'update successful',savedTask});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while marking the task as complete' });
  }
};

exports.updateTask = async (req, res) => {
  try {const taskId = req.params.taskId;
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
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const title= req.body?.title;
    const description = req.body?.description;
    const dueDate = req.body?.dueDate;
    const priority = req.body?.priority;
    const userId = req.body?.userId;

    // Create a new task object
    const task = new Task({
      title,
      description,
      dueDate,
      priority
    });

    // Save the task to the database
    await task.save();

    // Add the task's ObjectId to the user's TodoList
    await User.findByIdAndUpdate(userId, {
      $push: { TodoList: task._id }
    });

    res.status(201).json({success:true, message: 'Task created successfully', task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message: 'Internal server error' });
  }
};


exports.deleteTask = async (req, res) => {try {const taskId = req.params.taskId;
    
    // Remove the task from the database
    await Task.deleteOne({ _id: taskId });

    // Remove the task's ObjectId from the user's TodoList
    await User.findByIdAndUpdate(userId, {
      $pull: { TodoList: taskId }
    });

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


exports.viewTasks = async (req, res) => {try{const userId = req.params.userId;

    // Find the user by ID
    const currentUser = await User.findById(userId);

    // Get the list of task IDs from the user's TodoList
    const taskIds = currentUser.todoList;

    // Find all the tasks in the Task model with IDs in the taskIds array
    const tasks = await Task.find({ _id: { $in: taskIds } });

    res.status(200).json({ success: true, message: 'Tasks retrieved successfully', tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err });
  }
};

