import {Router} from "express";
import User from "../models/user.model.js";
import Book from "../models/book.model.js";
import jwt from "jsonwebtoken";
import {authenticateToken} from "./userAuth.js";

const router = Router();

// add a new book from admin side
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
      const user = req.user;
      if (user.role !== "admin") {
        return res.status(401).json({ message: "You are not authorized to add a book" });
      }
  
      const book = new Book({
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        condition: req.body.condition,
        description: req.body.description,
        price: req.body.price,
        contactPhone: req.body.contactPhone,
        contactEmail: req.body.contactEmail,
        seller: user._id // set the seller
      });
  
      await book.save();
      res.status(201).json({ message: "Book added successfully" });
    } catch (error) {
      console.error("Add-book error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

export default router;