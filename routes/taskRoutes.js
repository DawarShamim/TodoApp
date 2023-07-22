const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');
const{Authentication, AuthenticateUser} =require('../Auth');

// taskController.ChangeStatus;
router.put('/changeStatus/:task_id', Authentication,taskController.ChangeStatus);

// Get all tasks of a specific User.
// taskController.viewTasks;
router.get("/all",Authentication,AuthenticateUser,taskController.viewTasks);

// taskController.createTask;
router.post('/new', Authentication, AuthenticateUser,taskController.createTask);

// taskController.updateTask;
router.put('/changeTask/:task_id', Authentication,taskController.updateTask);

// taskController.deleteTask;
router.delete('/delete/:task_id', Authentication,AuthenticateUser,taskController.deleteTask);



// Get a single User by Username
// router.get("/find/:username", taskController.getUserByusername);
// // Update a User by Username
// router.put("/update/profile/:username", taskController.updateUserByusername);

// // Update User password by Username
// router.put("/update/password/:username", taskController.updateUserPassword);

// // Delete a User by Username
// router.delete("/delete/:username", taskController.deleteUserByusername);


module.exports = router;
