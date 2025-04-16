import {Router} from "express";
import User from "../models/user.model.js";
import {authenticateToken} from "./userAuth.js";
import mongoose from "mongoose";

const router = Router();

// add book to cart
router.put("/add-book-to-cart", authenticateToken, async (req, res) => {
    try {
        const {bookid, id} = req.headers;
        const userdata = await User.findById(id);
        const isBookInCart = userdata.cart.includes(bookid);
        
        if(isBookInCart){
            return res.status(200).json({message: "Book is already in cart"});
        }

        await User.findByIdAndUpdate(id, {$push : {cart : new mongoose.Types.ObjectId(bookid)}});
        return res.status(200).json({message: "Book added to cart"});
    } 
    catch (error) {
        res.status(500).json({message: "Internal server error"});    
    }
});

// remove book from cart
router.put("/remove-book-from-cart/:bookid", authenticateToken, async (req, res) => {
    try {
        const {bookid} = req.params;
        const {id} = req.headers;
        const userdata = await User.findById(id);
        const isBookInCart = userdata.cart.includes(bookid);
        
        if(isBookInCart){
            await User.findByIdAndUpdate(id, {$pull : {cart : new mongoose.Types.ObjectId(bookid)}});
        }

        return res.status(200).json({message: "Book removed from cart"});
    } 
    catch (error) {
        res.status(500).json({message: "Internal server error"});    
    }
});

// get cart of particular user
router.get("/get-cart-books", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cartBooks = userData.cart.reverse();
        return res.json({status: "Success", data: cartBooks});
    } 
    catch (error) {
        res.status(500).json({message: "Internal server error"}); 
    }
});

export default router;