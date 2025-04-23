import axios from "axios";
import React, { useEffect, useState } from "react";
import { CardSpotlight } from "../components/CardSpotlight.jsx";
import { Link } from "react-router-dom";

function Favorites() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/v1/get-favorites-books",
          { headers }
        );
        setFavoriteBooks(response.data.data);
      } catch (err) {
        console.error("Error fetching favorite books:", err);
      }
    };
    fetch();
  }, []);

  if (favoriteBooks.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Gradient Background Ball */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#b6d07a] to-[#86c232] opacity-30 blur-3xl animate-pulse z-0" />
        
        <h2 className="text-2xl font-semibold mb-2 z-10">Your Favorites</h2>
        <p className="text-gray-400 text-sm z-10">You haven't added any favorite books yet.</p>
      </div>
    );
  }

  return (
    <div className="relative bg-black text-white min-h-screen px-4 md:px-8 py-6 overflow-hidden">
      {/* Gradient Background Ball */}
      <div className="absolute top-[-120px] left-[-80px] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#b6d07a] to-[#86c232] opacity-30 blur-3xl animate-pulse z-0" />
      
      {/* Heading */}
      <div className="relative z-10 text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#b6d07a]">Favorite Books</h1>
        <p className="mt-1 text-gray-400 text-xs md:text-sm">A personal list of books you've favorited.</p>
        <div className="mt-2 w-16 h-[2px] mx-auto bg-[#b6d07a] rounded-full" />
        <p className="mt-2 text-xs text-gray-500">{favoriteBooks.length} book(s) saved</p>
      </div>

      {/* Book Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {favoriteBooks.map((book) => (
          <div key={book._id} className="flex justify-center">
            <CardSpotlight className="relative w-[240px] h-[340px] p-4 text-white shadow-md rounded-lg flex flex-col justify-between">
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={book.url}
                  className="w-full h-full object-cover rounded-md opacity-30"
                  draggable="false"
                  style={{ filter: "blur(1px)" }}
                />
              </div>

              {/* Book Info */}
              <div className="relative z-10 text-center flex flex-col gap-2">
                <h3 className="text-base font-semibold">{book.name}</h3>
                <p className="text-xs text-gray-300">{book.title}</p>
              </div>

              {/* Button & Price */}
              <div className="relative z-10 flex justify-between items-center w-full mt-2 flex-wrap gap-2">
                <p className="text-sm font-medium text-yellow-200">
                  {book.price > 0 ? `$${book.price}` : "Free"}
                </p>
                <Link
                  to={`/book/${book._id}`}
                  className="px-2 py-1 text-xs border border-gray-500 rounded-md text-[#A6ADBB] hover:bg-[#b6d07a] hover:text-black transition duration-300"
                >
                  Explore it
                </Link>
              </div>
            </CardSpotlight>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
