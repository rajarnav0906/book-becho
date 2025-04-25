import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Loader from "./Loader";
import { Mail, Phone, BookOpen, Tag, Pencil, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

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

  if (!book) return <Loader />;

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id
  };

  const handleFavorites = async () => {
    const response = await axios.put("http://localhost:4001/api/v1/add-book-to-favorites", {}, { headers });
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put("http://localhost:4001/api/v1/add-book-to-cart", {}, { headers });
    alert(response.data.message);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#1e1e1e] relative px-4 py-16 flex justify-center items-center">
        {/* Gradients */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#222] via-[#333] to-[#444]" />
        <div className="absolute top-[-150px] right-[-150px] w-[400px] h-[400px] bg-[#6fc1ff22] rounded-full blur-3xl z-0" />
        <div className="absolute bottom-[-150px] left-[-150px] w-[300px] h-[300px] bg-[#b6d07a22] rounded-full blur-3xl z-0" />

        {/* Book Details Card */}
        <div className="relative z-10 w-full max-w-6xl bg-[#121212] rounded-2xl shadow-2xl border border-[#333] flex flex-col lg:flex-row overflow-hidden">
          {/* Image Section */}
          <div className="lg:w-1/2 w-full p-4 sm:p-6 flex justify-center items-center">
            <div className="relative w-full max-w-md h-auto sm:h-[400px] rounded-xl overflow-hidden border-4 border-[#b6d07a] shadow-xl bg-[#1a1a1a]">
              <img
                src={book.url}
                alt={book.title}
                className="w-full h-full object-contain"
              />
              {isLoggedIn && (
                <div className="absolute top-3 right-3 flex gap-2 sm:gap-3 z-10">
                  {role === "user" && (
                    <>
                      <button
                        onClick={handleFavorites}
                        className="bg-black/60 hover:bg-black/80 p-2 rounded-full border border-[#444] hover:text-[#b6d07a] transition"
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.318 6.318a4.5 4.5 0 016.364 0L12 6.637l.318-.318a4.5 4.5 0 116.364 6.364L12 21l-6.682-8.318a4.5 4.5 0 010-6.364z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={handleCart}
                        className="bg-black/60 hover:bg-black/80 p-2 rounded-full border border-[#444] hover:text-[#6fc1ff] transition"
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 2.586A1 1 0 007 17h10a1 1 0 00.893-1.447L17 13M7 13V6h10v7"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                  {role === "admin" && (
                    <>
                      <button className="bg-black/60 hover:bg-black/80 p-2 rounded-full border border-[#444] hover:text-[#b6d07a] transition">
                        <Pencil className="w-5 h-5 text-white" />
                      </button>
                      <button className="bg-black/60 hover:bg-black/80 p-2 rounded-full border border-[#444] hover:text-[#ff6f6f] transition">
                        <Trash2 className="w-5 h-5 text-white" />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="lg:w-1/2 w-full p-6 sm:p-8 flex flex-col justify-between text-gray-300 text-center lg:text-left items-center lg:items-start">
            <div className="w-full">
              <h1 className="text-3xl font-extrabold text-[#b6d07a] mb-1">
                {book.title}
              </h1>
              <p className="text-sm sm:text-base text-[#6fc1ff] italic mb-6">
                by {book.author}
              </p>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed border-t border-[#2a2a2a] pt-4 w-full">
                <p className="flex items-center gap-2 justify-center lg:justify-start">
                  <BookOpen className="w-5 h-5 text-[#b6d07a]" />
                  <span className="font-semibold text-[#b6d07a]">Condition:</span> {book.condition}
                </p>
                <p className="flex items-center gap-2 justify-center lg:justify-start">
                  <Tag className="w-5 h-5 text-[#b6d07a]" />
                  <span className="font-semibold text-[#b6d07a]">Price:</span> ₹{book.price}
                </p>
                <div className="w-full">
                  <div className="flex items-center gap-2 mb-1 justify-center lg:justify-start">
                    <svg
                      className="w-5 h-5 text-[#b6d07a]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0H3" />
                    </svg>
                    <p className="font-semibold text-[#b6d07a]">Description:</p>
                  </div>
                  <p className="text-gray-400 text-center lg:text-left">
                    {book.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm sm:text-base border-t border-[#2a2a2a] pt-4">
                <p className="flex flex-wrap items-center gap-2 justify-center lg:justify-start">
                  <Mail className="w-5 h-5 text-[#6fc1ff]" />
                  <span className="font-semibold text-[#b6d07a]">Seller Email:</span>
                  <span className="text-[#6fc1ff] break-all">{book.contactEmail}</span>
                </p>
                <p className="flex items-center gap-2 justify-center lg:justify-start">
                  <Phone className="w-5 h-5 text-[#6fc1ff]" />
                  <span className="font-semibold text-[#b6d07a]">Contact Number:</span>
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
