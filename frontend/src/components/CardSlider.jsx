import React, { useEffect, useState } from "react";
import { CardSpotlight } from "./CardSpotlight";
import axios from "axios";
import { Link } from "react-router-dom";

const CardSlider = () => {
  const [freeBooks, setFreeBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetch("/list.json")
  //     .then((response) => {
  //       if (!response.ok) throw new Error("Failed to fetch books");
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const filteredBooks = data.filter((book) => book.price === 0);
  //       setFreeBooks(filteredBooks);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:4001/api/v1/get-recent-books");
      setFreeBooks(response.data.data);
    }
    fetch();
  }, []);

  // if (loading) return <p className="text-white text-center">Loading...</p>;
  // if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (freeBooks.length === 0) return <p className="text-white text-center">No free books available</p>;

  return (
    <div className="relative bg-gray-900 p-16 pb-6">
      {/* Header Section */}
      <h2 className="text-center text-[#b6d07a] text-2xl md:text-3xl font-bold mb-10 md:mb-12">
        📚 Explore Free Books
      </h2>

      {/* Slider Wrapper */}
      <div className="relative overflow-hidden m-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-6 overflow-y-auto md:overflow-x-auto p-4 scrollbar-hide md:h-auto h-[500px]">
          {freeBooks.map((book) => (
            <div
              key={book.id}
              className="w-full md:min-w-[260px] flex justify-center items-center"
            >
              <CardSpotlight className="relative w-[260px] md:w-[260px] h-[370px] p-6 text-white shadow-xl rounded-lg flex flex-col justify-between">
                {/* Background Image with Blur Effect */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={book.url}
                    alt={book.name}
                    className="w-full h-full object-cover rounded-md opacity-40"
                    draggable="false"
                    style={{ filter: "blur(1px)" }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center flex flex-col gap-3">
                  <h3 className="mt-2 font-bold text-lg">{book.name}</h3>
                  <p className="text-sm text-gray-300">{book.title}</p>
                </div>

                {/* Price & Button */}
                <div className="relative z-10 flex justify-between items-center w-full mt-3">
                  <p className="text-lg font-semibold text-yellow-200">${book.price}</p>
                  
                    <Link
                      to={`/book/${book._id}`}
                      className="flex items-center gap-2 border border-gray-500 px-3 py-1 rounded-md text-[#A6ADBB] bg-transparent hover:bg-[#b6d07a] hover:text-black transition duration-300"
                    >
                      Explore Now
                    </Link>
                  
                </div>
              </CardSpotlight>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSlider;