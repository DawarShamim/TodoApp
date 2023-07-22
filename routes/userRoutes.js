const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const{ Authentication,login,AuthenticateUser } =require('../Auth');

router.post('/new',userController.registerUser);

router.put("/updatePassword", Authentication,AuthenticateUser,userController.updateUserPassword);

router.get('/userProfile',Authentication,AuthenticateUser,userController.GetUserProfile);

router.put('/updateProfile', Authentication,AuthenticateUser,userController.UpdateProfile);

module.exports = router;
