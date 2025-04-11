import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    url: { type: String, required: true }, // image
    title: { type: String, required: true },
    author: { type: String, required: true },
    condition: {
      type: String,
      enum: ["New", "Good", "Fair", "Poor"],
      default: "Good",
    },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    seller: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    buyer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isSold: {
      type: Boolean,
      default: false,
    },
    contactPhone: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
