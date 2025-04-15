import {Router} from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {authenticateToken} from "./userAuth.js";

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
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // ✅ FIX: Use flat object
    const payload = {
      id: existingUser._id,
      username: existingUser.username,
      role: existingUser.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d"
    });

    res.json({
      id: existingUser._id,
      username: existingUser.username,
      role: existingUser.role,
      token: token
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get user information
router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const {id} = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);

  } 
  catch (error) {
    res.status(500).json({message : "Internal server error"});
  }
});

// update address
router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({message: "Address updated successfully"});
  } 
  catch (error) {
    res.status(500).json({message : "Internal server error"});
  }
});



export default router;