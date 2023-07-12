const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');
const{Authentication} =require('../Auth');

// Route for registering an faculty user
router.post('/new', Authentication,taskController.ChangeStatus);

// Get all Users
router.get("/all",Authentication,taskController.viewTasks);

// Get a single User by Username
// router.get("/find/:username", taskController.getUserByusername);
router.post("/hehe/:userid",Authentication,userController.checker);
// // Update a User by Username
// router.put("/update/profile/:username", taskController.updateUserByusername);

// // Update User password by Username
// router.put("/update/password/:username", taskController.updateUserPassword);

// // Delete a User by Username
// router.delete("/delete/:username", taskController.deleteUserByusername);


module.exports = router;
