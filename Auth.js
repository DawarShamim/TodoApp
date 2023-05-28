const bcrypt = require('bcryptjs');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const passport = require("passport");


const login = async (req, res) => {
    try {
      const username = req.body?.username;
      const password =req.body?.password;

      let user = await User.findOne({ username });
      
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Verify if the password matches
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }
  
      let token = jwt.sign(
        {
          user_id: user._id,
          username: username,
        },
        "Route-Token",
      );
      let result = {
        username: username,
        token};
              
      // User authenticated
      res.status(200).json({ success: true, message: 'Login successful', result });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to login', error: err.message });
    }
  };


const Authentication =passport.authenticate("jwt", { session: false });

const UserRole=(authorizedUsers)=>(req,res,next)=>{
  const CurrentRole =req.user;
  console.log(CurrentRole);
  if(authorizedUsers.includes(CurrentRole[1])){
return next();
}else
{
  return res.status(401).json({
    message: "Unauthorized",
    success: false,
  });
};}

    module.exports = {
        Authentication,
        UserRole,
        login,
      };