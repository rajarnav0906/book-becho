import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  seller: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  book: {
    type: mongoose.Types.ObjectId,
    ref: "Book",
    required: true
  },
  status: {
    type: String,
    enum: ['order placed', 'out for delivery', 'delivered', 'cancelled'],
    default: 'order placed'
  },
  message: {
    type: String // optional message for contact/purchase
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
