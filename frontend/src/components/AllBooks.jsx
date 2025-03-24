import React, { useEffect, useState } from "react";
import { CardSpotlight } from "./CardSpotlight";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/list.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch books");
        return response.json();
      })
      .then((data) => {
        setBooks(data); // Set all books (both free and paid)
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (books.length === 0) return <p className="text-white text-center">No books available</p>;

  return (
    <div className="bg-gray-900 p-20 pb-6">
      {/* Header Section */}
      <h2 className="text-center text-[#b6d07a] text-2xl md:text-3xl font-bold mb-10 md:mb-12">
        📚 Explore Our Book Collection
      </h2>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
        {books.map((book) => (
          <div key={book.id} className="flex justify-center">
            <CardSpotlight className="relative w-[260px] h-[370px] p-6 text-white shadow-xl rounded-lg flex flex-col justify-between">
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={book.image}
                  alt={book.name}
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
                <a
                  href={book.read_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-gray-500 px-3 py-1 rounded-md text-[#A6ADBB] bg-transparent hover:bg-[#b6d07a] hover:text-black transition duration-300"
                >
                  {book.price > 0 ? "Buy Now" : "Read Now"}
                </a>
              </div>
            </CardSpotlight>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
