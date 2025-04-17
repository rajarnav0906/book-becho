import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/api/v1/get-book-by-id/${id}`
        );
        setBook(response.data.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
    fetch();
  }, [id]);

  if (!book) {
    return (
      <p className="text-center text-white mt-10">Loading book details...</p>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a] relative px-4 py-16 overflow-hidden">
        {/* Gradient Background Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0f0f0f] via-[#0a0a0a] to-[#1a1a1a]" />

        {/* Glow Accent - Blue */}
        <div className="absolute top-[-200px] right-[-200px] w-[400px] h-[400px] bg-[#6fc1ff22] rounded-full blur-3xl z-0" />

        {/* Glow Accent - Green */}
        <div className="absolute bottom-[-150px] left-[-150px] w-[300px] h-[300px] bg-[#b6d07a22] rounded-full blur-3xl z-0" />

        <div className="relative z-10 max-w-6xl mx-auto bg-[#111] rounded-2xl shadow-2xl border border-[#222] flex flex-col lg:flex-row overflow-hidden">
          {/* Image Section */}
          <div className="lg:w-1/2 w-full h-[400px] lg:h-auto">
            <img
              src={book.url}
              alt={book.title}
              className="w-full h-full object-cover rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl border-r-4 border-[#b6d07a]"
            />
          </div>

          {/* Info Section */}
          <div className="lg:w-1/2 w-full p-8 text-gray-300 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#b6d07a] leading-snug mb-1">
                {book.title}
              </h1>
              <p className="text-sm md:text-base text-[#6fc1ff] italic mb-6">
                by {book.author}
              </p>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed border-t border-[#2a2a2a] pt-4">
                <p>
                  <span className="font-semibold text-[#b6d07a]">
                    📦 Condition:
                  </span>{" "}
                  {book.condition}
                </p>
                <p>
                  <span className="font-semibold text-[#b6d07a]">
                    💰 Price:
                  </span>{" "}
                  ₹{book.price}
                </p>
                <div>
                  <p className="font-semibold text-[#b6d07a] mb-1">
                    📝 Description:
                  </p>
                  <p className="text-gray-400">{book.description}</p>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm sm:text-base border-t border-[#2a2a2a] pt-4">
                <p>
                  <span className="font-semibold text-[#b6d07a]">
                    📧 Seller Email:
                  </span>{" "}
                  <span className="text-[#6fc1ff]">{book.contactEmail}</span>
                </p>
                <p>
                  <span className="font-semibold text-[#b6d07a]">
                    📞 Contact Number:
                  </span>{" "}
                  <span className="text-[#6fc1ff]">{book.contactPhone}</span>
                </p>
              </div>
            </div>

            <button className="mt-8 w-full bg-gradient-to-r from-[#b6d07a] to-[#6fc1ff] text-black font-semibold py-3 rounded-lg hover:brightness-110 transition-all duration-200 shadow-lg">
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBookDetails;
