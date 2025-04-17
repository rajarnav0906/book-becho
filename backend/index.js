import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from './connection/db.js';
import userRoutes from './routes/user.router.js';
import adminRoutes from "./routes/book.router.js";
import favoriteRoutes from "./routes/favorite.router.js";
import cartRoutes from "./routes/cart.router.js";
import orderRoutes from "./routes/order.router.js";

const app = express()

app.use(cors());
app.use(express.json()); // allows express to use JSON body parsing

dotenv.config({
  path: './.env'
});

const PORT = process.env.PORT || 4000;

// database configuration
connectDB();

// routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", adminRoutes);
app.use("/api/v1", favoriteRoutes);
app.use("/api/v1", cartRoutes);
app.use("/api/v1", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
 

/*

// connecting database connection


(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("Connected to MongoDB");

    app.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    })

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`)
    })

  } catch (error) {
    console.error("ERROR in connection: ", error);
    throw error;
  }
})();

*/