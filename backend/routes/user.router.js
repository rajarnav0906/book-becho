import {Router} from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();


// Sign-up
router.post("/signup", async (req, res) => {
  try {
    const {username, email, password, address} = req.body;

    // check username length is more than 3 
    if(username.length <= 3){
        return res.status(400).json({message: "Username must be at least 4 characters"});
    }

    // check if user already exists
    const existingUser = await User.findOne({username});
    if(existingUser){
        return res.status(400).json({message: "User already exists!"});
    }

    // check if email already exists
    const existingEmail = await User.findOne({email});
    if(existingEmail){
        return res.status(400).json({message: "Email already exists!"});
    }

    // check password length
    if(password.length <= 6){
        return res.status(400).json({message: "Password should be greater than six length"});
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // if all checks passed
    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
        address: address
    });
    await newUser.save();
    res.status(201).json({message: "User created successfully!"});

  } 
  catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
});


// Log-in
router.post("/log-in", async (req, res) => {
    try {
      const {username, password} = req.body;

      // find if existingUser
      const existingUser = await User.findOne({username});
      if(!existingUser){
        return res.status(400).json({message: "User not found!"});
      }

      await bcrypt.compare(password, existingUser.password, (err, data) => {
        if(data){
          res.json({message: "Logged in successfully!"});
        }
        else{
            return res.status(400).json({message: "Invalid credentials!"});
        }
      })
    } 
    catch (error) {
      res.status(500).json({message: "Internal server error"});
    }
  });



export default router;