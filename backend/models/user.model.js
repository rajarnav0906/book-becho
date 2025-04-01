import mongoose from 'mongoose';
const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://i.pinimg.com/736x/81/8a/1b/818a1b89a57c2ee0fb7619b95e11aebd.jpg"
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
    favourites: [{
        type: mongoose.Types.ObjectId,
        ref: 'books'
    }],
    cart: [{
        type: mongoose.Types.ObjectId,
        ref: 'books'
    }],
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: 'order'
    }]
}, {timestamps: true})

module.exports = mongoose.model("user", user)