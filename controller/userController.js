const User= require("../models/User");
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const email = req.body?.Email;
    const username= req.body?.Username;
    const password = req.body?.Password;
    const firstName = req.body?.FirstName;
    const lastName = req.body?.LastName;
    const dateOfBirth = req.body?.DateOfBirth;


    // Check if the email or username already exists in the database
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email or username already exists' });
    }

    // Check password length before hashing
    if (password.length < 8 || password.length > 20) {
      return res.status(400).json({ success: false, message: 'Password must be between 8 and 20 characters long' });
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

    // Generate a JWT token
    const token = jwt.sign(
      {
        user_id: newUser._id,
        username: newUser.username,
      },
      'Route-Token'
    );

    // User registered and logged in successfully
    res.status(201).json({ success: true, message: 'User registered and logged in successfully', token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
  }
};
exports.UpdateProfile= async (req, res) => {
  try {
    const userId = req.user; // Assuming you have the userId available from the authentication middleware

    // Get the updated profile data from the request body
    const firstName = req.body?.firstName;
    const lastName = req.body?.lastName;
    const dateOfBirth = req.body?.dateOfBirth;

    // Find the user in the database and update their profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        dateOfBirth,
      },
      { new: true } // Return the updated user data
    );
    // Check if the user exists and if the update was successful
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    // Return the updated user data
    res.status(200).json({ success: true, message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update profile', error: err.message });
  }
};


exports.updateUserPassword = async (req, res) => {
    try {
      const _id  = req.user;
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

exports.GetUserProfile = async (req, res) => {
      try {
        const user = await User.findById(req.user).select('-password -todoList -__v -_id');
    
        if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
        }
    
        res.status(200).json({ success: true, message: "Profile retrieved successfully", user });
      } catch (err) {
        res.status(500).json({ success: false, message: "Failed to find profile", error: err.message });
      }
    };
    
