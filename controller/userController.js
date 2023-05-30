const User= require("../models/User");
const bcrypt =require('bcryptjs');

exports.registerUser = async (req, res) => {
    try {
      const { email, username, password, firstName, lastName, dateOfBirth } = req.body;
  
      // Check if the email or username already exists in the database
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email or username already exists' });
      }
  
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new user
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        dateOfBirth,
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


