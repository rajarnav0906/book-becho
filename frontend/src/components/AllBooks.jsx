import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { CardSpotlight } from "./CardSpotlight";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "./Loader"; // Import Loader component

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v1/get-all-books");
        setBooks(response.data.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError("Error fetching books.");
        setLoading(false); // Set loading to false in case of an error
      }
    };
    fetch();
  }, []);

  if (loading) return <Loader />; // Show Loader while fetching books

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  if (books.length === 0)
    return <p className="text-white text-center">No books available</p>;

  return (
    <motion.div
      className="bg-gray-900 p-20 pb-6 min-h-screen"
      initial={{ opacity: 0, y: 20 }} // Starts faded out and slightly lower
      animate={{ opacity: 1, y: 0 }} // Fades in and moves to position
      exit={{ opacity: 0, y: -20 }} // Fades out smoothly on exit
      transition={{ duration: 0.6, ease: "easeOut" }} // Smooth transition
    >
      {/* Header Section */}
      <h2 className="text-center text-[#b6d07a] text-2xl md:text-3xl font-bold mb-10 md:mb-12">
        📚 Explore Our Book Collection
      </h2>

      {/* Books Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {books.map((book, index) => (
          <motion.div
            key={book.id}
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }} // Staggered effect for each book
          >
            <CardSpotlight className="relative w-[260px] h-[370px] p-6 text-white shadow-xl rounded-lg flex flex-col justify-between">
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={book.url}
                  className="w-full h-full object-cover rounded-md opacity-40"
                  draggable="false"
                  style={{ filter: "blur(1px)" }}
                />
              </div>

              {/* Book Info */}
              <div className="relative z-10 text-center flex flex-col gap-3">
                <h3 className="mt-2 font-bold text-lg">{book.name}</h3>
                <p className="text-sm text-gray-300">{book.title}</p>
              </div>

              {/* Button: Read Now (Free) or Buy Now (Paid) */}
              <div className="relative z-10 flex justify-between items-center w-full mt-3">
                <p className="text-lg font-semibold text-yellow-200">
                  {book.price > 0 ? `$${book.price}` : "Free"}
                </p>
                <Link
                  to={`/book/${book._id}`}
                  className="flex items-center gap-2 border border-gray-500 px-3 py-1 rounded-md text-[#A6ADBB] bg-transparent hover:bg-[#b6d07a] hover:text-black transition duration-300"
                >
                  Explore Now
                </Link>
              </div>
            </CardSpotlight>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AllBooks;
