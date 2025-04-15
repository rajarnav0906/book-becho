import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://i.pinimg.com/736x/81/8a/1b/818a1b89a57c2ee0fb7619b95e11aebd.jpg",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    favorites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Book",
      },
    ],
    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Book",
      },
    ],
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Order",
      },
    ],
    listedBooks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
