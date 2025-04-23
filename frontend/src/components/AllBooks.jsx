import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CardSpotlight } from "./CardSpotlight.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "./Loader.jsx";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v1/get-all-books");
        setBooks(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching books.");
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (books.length === 0) return <p className="text-white text-center">No books available</p>;

  return (
    <motion.div
      className="relative bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-black p-20 pb-6 min-h-screen overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Gradient Glow Balls */}
      <div className="absolute top-[-180px] right-[-180px] w-[350px] h-[350px] bg-[#6fc1ff33] rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-160px] left-[-160px] w-[320px] h-[320px] bg-[#b6d07a33] rounded-full blur-3xl z-0" />
      <div className="absolute top-[20%] left-[-100px] w-[220px] h-[220px] bg-[#b6d07a22] rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[20%] right-[-120px] w-[260px] h-[260px] bg-[#6fc1ff22] rounded-full blur-3xl z-0" />
      <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[180px] h-[180px] bg-[#b6d07a1a] rounded-full blur-3xl z-0" />

      {/* Header */}
      <h2 className="relative z-10 text-center text-[#b6d07a] text-2xl md:text-3xl font-bold mb-10 md:mb-12">
        📚 Explore Our Book Collection
      </h2>

      {/* Books Grid */}
      <motion.div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6"
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
            transition={{ delay: index * 0.1, duration: 0.4 }}
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

              {/* Button */}
              <div className="relative z-10 flex justify-between items-center w-full mt-3 flex-wrap gap-2">
                <p className="text-lg font-semibold text-yellow-200">
                  {book.price > 0 ? `$${book.price}` : "Free"}
                </p>
                <Link
                  to={`/book/${book._id}`}
                  className="flex items-center justify-center gap-2 border border-gray-500 px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-md text-[#A6ADBB] bg-transparent hover:bg-[#b6d07a] hover:text-black transition duration-300 w-full sm:w-auto"
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
