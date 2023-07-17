const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const{ Authentication,login } =require('../Auth');

router.post('/new',userController.registerUser);

router.post("/updatePassword/:userid", Authentication,userController.updateUserPassword);

router.get('/userProfile/:user_id',userController.GetUserProfile);


module.exports = router;
