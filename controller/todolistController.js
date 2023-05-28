const Todo = require('../models/Todo');
const Task = require('../models/Task');

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const { userId } = req.body;

    // Create a new todo for the user
    const todo = new Todo({ user: userId, tasks: [] });
    const savedTodo = await todo.save();

    res.status(201).json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the todo' });
  }
};

// Add a task to a todo
exports.addTaskToTodo = async (req, res) => {
  try {
    const { todoId, taskId } = req.body;

    // Find the todo and task by their IDs
    const todo = await Todo.findById(todoId);
    const task = await Task.findById(taskId);

    // Add the task to the todo's tasks array
    todo.tasks.push(task);
    const savedTodo = await todo.save();

    res.status(200).json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the task to the todo' });
  }
};

// Remove a task from a todo
exports.removeTaskFromTodo = async (req, res) => {
  try {
    const { todoId, taskId } = req.body;

    // Find the todo and task by their IDs
    const todo = await Todo.findById(todoId);

    // Remove the task from the todo's tasks array
    todo.tasks.pull(taskId);
    const savedTodo = await todo.save();

    res.status(200).json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while removing the task from the todo' });
  }
};

// Get tasks from a todo
exports.getTasksFromTodo = async (req, res) => {
  try {
    const { todoId } = req.params;

    // Find the todo by its ID and populate the tasks
    const todo = await Todo.findById(todoId).populate('tasks');

    res.status(200).json(todo.tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the tasks from the todo' });
  }
};
