const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const{ UserRole,Authentication,login } =require('../Auth');

// Route for registering an faculty user
router.post('/new', userController.registerUser);

// Get all Users
// router.get("/all",userController.getallUser);

// Get a single User by Username
// router.get("/find/:username", userController.getUserByusername);
router.post("/hehe/:userid",userController.checker);
// // Update a User by Username
// router.put("/update/profile/:username", userController.updateUserByusername);

// // Update User password by Username
// router.put("/update/password/:username", userController.updateUserPassword);

// // Delete a User by Username
// router.delete("/delete/:username", userController.deleteUserByusername);


module.exports = router;
