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

// update book 
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndUpdate(bookid, {
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        condition: req.body.condition,
        description: req.body.description,
        price: req.body.price,
        contactPhone: req.body.contactPhone,
        contactEmail: req.body.contactEmail,
    })

    return res.status(200).json({message: "Book updated successfully!"});
  } 
  catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//delete book
router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({message: "Book deleted successfully!"});
  } 
  catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// to get all books 
router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({createdAt: -1});
    return res.json({status: "Success", data: books});
  }
  catch (error) {
    res.status(500).json({message: "Internal server Error"});
  }
});

// get recent books limited to 4
router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({createdAt: -1}).limit(4);
    return res.json({status: "Success", data: books});
  } 
  catch (error) {
    res.status(500).json({message: "Internal server error"})
  }
});

// get any particular book by id
router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const book = await Book.findById(id);
    return res.json({status: "Success", data: book});
  } 
  catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
});
  

export default router;