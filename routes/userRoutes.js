const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const{ Authentication,login } =require('../Auth');

// Route for registering an faculty user
router.post('/new', Authentication,userController.registerUser);

router.post("/updatepassword/:userid", Authentication,userController.updateUserPassword);
// // Update a User by Username
// router.put("/update/profile/:username", userController.updateUserByusername);

// // Update User password by Username
// router.put("/update/password/:username", userController.updateUserPassword);

// // Delete a User by Username
// router.delete("/delete/:username", userController.deleteUserByusername);


module.exports = router;
