import {Router} from "express";
import User from "../models/user.model.js";
import {authenticateToken} from "./userAuth.js";
import mongoose from "mongoose";

const router = Router();

// add book to favorites
router.put("/add-book-to-favorites", authenticateToken, async (req, res) => {
    try {
        const {bookid, id} = req.headers;
        const userdata = await User.findById(id);
        const isBookFavorite = userdata.favorites.includes(bookid);
        
        if(isBookFavorite){
            return res.status(200).json({message: "Book is already in favorites"});
        }

        await User.findByIdAndUpdate(id, {$push : {favorites : new mongoose.Types.ObjectId(bookid)}});
        return res.status(200).json({message: "Book added to favorites"});
    } 
    catch (error) {
        res.status(500).json({message: "Internal server error"});    
    }
});

// remove book from favorites
router.put("/remove-book-from-favorites", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.body;
        const {id} = req.headers;
        const userdata = await User.findById(id);
        const isBookFavorite = userdata.favorites.includes(bookid);
        
        if(isBookFavorite){
            await User.findByIdAndUpdate(id, {$pull : {favorites : new mongoose.Types.ObjectId(bookid)}});
        }

        return res.status(200).json({message: "Book removed from favorites"});
    } 
    catch (error) {
        res.status(500).json({message: "Internal server error"});    
    }
});

// get favorite books of particular user
router.get("/get-favorites-books", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("favorites");
        const favoriteBooks = userData.favorites;
        return res.json({status: "Success", data: favoriteBooks});
    } 
    catch (error) {
        res.status(500).json({message: "Internal server error"}); 
    }
});



export default router;