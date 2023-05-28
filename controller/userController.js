const User= require("../models/User");
const bcrypt =require('bcryptjs');

exports.registerUser = async (req, res) => {
    try {
      const name =req.body?.name;
      const email = req.body?.email;
      const password  = req.body?.password;
      // Check if the username or email already exists in the database
      const existingUser = await User.findOne({ $or: { email } });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Username or email already exists' });
      }
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);    
      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
    }
  };


exports.updateUserPassword = async (req, res) => {
    try {
      const _id  = req.params._id;
      console.log(req.user);
      const oldPassword = req.body?.oldPassword;
      const newPassword = req.body?.newPassword;
      const updateUser = await User.findById(_id);
  
      if (!updateUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

        // Verify if the old password matches
        const passwordMatch = await bcrypt.compare(oldPassword, updateUser.password);
      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
        }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);    
        // Update the password
        updateUser.password = hashedPassword;
      await updateUser.save();
    
        res.status(200).json({ success: true, message: "Password updated successfully" });
      } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update Password", error: err.message });
      }
    };


exports.getallUser= async (req,res)=>{
    try{
        const users= await User.find();
        
      res.status(201).json({ success: true, message: [],users });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
    }
};
