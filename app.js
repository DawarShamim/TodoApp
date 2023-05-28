const express = require("express");
const mongoose =require("mongoose");
const {success,error} = require("consola");
const cors = require("cors");

require('dotenv').config();
const DBurl=process.env.DBurl;

const app = express();
const passport = require("passport");

const{ UserRole,Authentication,login } =require('./Auth');


app.use(express.json()); 
app.use(cors());

require("./middleware/passport")(passport);

app.use('/User',require('./routes/userRoutes'))

startApp = async () => {
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(DBurl);
  
      success({
        message: "Connected to the database successfully",
        badge: true,
      });
  
      app.listen(3000, () => {
        success({
          message: "Server is started at PORT: 3000",
        });
      });
    } catch (err) {
      error({
        message: `Unable to connect with database: ${err.message}`,
        badge: true,
      });
      startApp();
    }
  };
  
  startApp();