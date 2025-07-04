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
    const fetchFavorites = async () => {
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
    fetchFavorites();
  }, []);

  const removeFromFavorites = async (bookid) => {
    try {
      const response = await axios.put(
        "http://localhost:4001/api/v1/remove-book-from-favorites",
        { bookid },
        { headers }
      );
      console.log(response.data.message);

      setFavoriteBooks((prev) => prev.filter((book) => book._id !== bookid));
    } catch (err) {
      console.error("Error removing book from favorites:", err);
    }
  };

  if (favoriteBooks.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Background blob */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#b6d07a] to-[#86c232] opacity-30 blur-3xl animate-pulse z-0" />

        {/* No image here */}
        <h2 className="text-2xl font-semibold mb-2 z-10">Your Favorites</h2>
        <p className="text-gray-400 text-sm z-10 text-center">
          You haven't added any favorite books yet.
        </p>
      </div>
    );
  }

  return (
    <div className="relative bg-black text-white min-h-screen px-6 md:px-12 lg:px-20 py-10 overflow-hidden">
      {/* Background blob */}
      <div className="absolute top-[-120px] left-[-80px] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#b6d07a] to-[#86c232] opacity-30 blur-3xl animate-pulse z-0" />

      <div className="relative z-10 text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#b6d07a] drop-shadow-md">
          Favorite Books
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          A personal collection curated by you.
        </p>
        <div className="mt-3 w-16 h-[3px] mx-auto bg-[#b6d07a] rounded-full" />
        <p className="mt-2 text-xs text-gray-500">
          {favoriteBooks.length} book(s) saved
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoriteBooks.map((book) => (
          <div key={book._id} className="flex justify-center relative">
            <CardSpotlight className="relative w-[240px] h-[360px] p-4 bg-white/5 backdrop-blur-lg border border-white/10 text-white shadow-xl rounded-2xl flex flex-col justify-between overflow-hidden transition-transform hover:scale-[1.03] duration-300 group">

              {/* Background Image with Overlay */}
              <div className="absolute inset-0 w-full h-full z-0">
                <img
                  src={book.url}
                  className="w-full h-full object-cover rounded-2xl opacity-30"
                  draggable="false"
                  style={{ filter: "blur(1px)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 rounded-2xl" />
              </div>

              {/* Remove Icon */}
              <button
                onClick={() => removeFromFavorites(book._id)}
                className="absolute top-3 right-3 z-20 text-red-400 hover:text-red-600 transition duration-300"
                title="Remove from Favorites"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  className="hover:scale-110 transition-transform"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                  2 5.42 4.42 3 7.5 3c1.74 0 
                  3.41 0.81 4.5 2.09C13.09 3.81 
                  14.76 3 16.5 3 19.58 3 22 5.42 
                  22 8.5c0 3.78-3.4 6.86-8.55 
                  11.54L12 21.35z" />
                </svg>
              </button>

              {/* Book Info */}
              <div className="relative z-10 text-center flex flex-col gap-2">
                <h3 className="text-lg font-bold text-white truncate">{book.name}</h3>
                <p className="text-sm text-gray-300">{book.title}</p>
              </div>

              {/* Price + Link */}
              <div className="relative z-10 flex justify-between items-center w-full mt-2 flex-wrap gap-2">
                <p className="text-sm font-medium text-yellow-200">
                  {book.price > 0 ? `$${book.price}` : "Free"}
                </p>
                <Link
                  to={`/book/${book._id}`}
                  className="px-3 py-[6px] text-sm border border-gray-400 rounded-lg text-white hover:bg-[#b6d07a] hover:text-black transition-all duration-300"
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
