const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const{ Authentication,login } =require('../Auth');

router.post('/new',userController.registerUser);

router.post("/updatepassword/:userid", Authentication,userController.updateUserPassword);



module.exports = router;
