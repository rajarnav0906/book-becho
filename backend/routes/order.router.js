import {Router} from "express";
import {authenticateToken} from "./userAuth.js";
import mongoose from "mongoose";
import Order from "../models/order.model.js";
import Book from "../models/book.model.js";
import User from "../models/user.model.js";

const router = Router();

// place an order
router.post("/place-order", authenticateToken, async (req, res) => {
    const { id } = req.headers;
    const { orders } = req.body; // Note: Corrected "order" → "orders"

    for (const orderData of orders) {
        const newOrder = new Order({
            buyer: id,
            seller: orderData.seller,  // ✅ Now adding seller
            book: orderData.book,      // ✅ Properly mapped
            message: orderData.message || "",  // optional if you want
        });

        const orderDataFromDB = await newOrder.save();

        // saving order in user model
        await User.findByIdAndUpdate(id, { $push: { orders: orderDataFromDB._id } });

        // clearing cart
        await User.findByIdAndUpdate(id, { $pull: { cart: orderData.book } });
    }

    return res.json({ status: "Success", message: "Order placed successfully!" });
});


// get order history
router.get("/order-history", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: {path: "book"}
        });

        const ordersData = userData.orders.reverse();
        return res.json({status: "Success", data: ordersData});
    } 
    catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
});

// get all orders --> admin
router.get("/all-orders", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find()
        .populate({path: "book"}).populate({path: "buyer"}).sort({createdAt: -1});

        return res.json({status: "Success", data: userData});
    } 
    catch (error) {
        res.status(500).json({message: "Internal server error"});    
    }
});

// update status --> admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const {id} = req.params;
        await Order.findByIdAndUpdate(id, {status: req.body.status});
        return res.json({status: "Success", message: "Status updated successfully!"});

    } 
    catch (error) {
        res.status(500).json({message: "Internal server error"});    
    }
});

export default router;
