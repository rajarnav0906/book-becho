import express from 'express';
import dotenv from 'dotenv';
import connectDB from './connection/db.js';

const app = express()

dotenv.config({
  path: './.env'
});

const PORT = process.env.PORT || 4000;

// database configuration
connectDB();

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