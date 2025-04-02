import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },

}, {timestamps: true});

export default mongoose.model("books", bookSchema);