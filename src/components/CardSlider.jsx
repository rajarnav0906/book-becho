import React, { useRef } from "react";
import { motion } from "framer-motion";
import { CardSpotlight } from "./CardSpotlight";

const CardSlider = ({ cards }) => {
  const freeBooks = cards.filter((book) => book.price === 0);
  const sliderRef = useRef(null);

  if (!freeBooks || freeBooks.length === 0) {
    return <p className="text-white text-center ">No free books available</p>;
  }

  return (
    <div className="relative bg-gray-900 px-6 md:px-16 lg:px-24 mt-16 md:mt-24">
      {/* Header Section with Proper Spacing */}
      <h2 className="text-center text-white text-2xl md:text-3xl font-bold mb-10 md:mb-12">
        📚 Explore Free Books
      </h2>

      {/* Slider Wrapper with Padding */}
      <div className="relative overflow-hidden">
        <motion.div
          ref={sliderRef}
          className="flex gap-8 md:gap-12 overflow-x-auto px-4 scrollbar-hide cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -((freeBooks.length - 3) * 280), right: 0 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {freeBooks.map((book) => (
            <motion.div key={book.id} className="min-w-[260px] flex justify-center items-center">
              <CardSpotlight className="relative w-[260px] h-[370px] p-6 text-white shadow-xl rounded-lg">
                {/* Background Image */}
                <img
                  src={book.image}
                  alt={book.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-md opacity-40 z-0"
                  draggable="false"
                />
                {/* Content */}
                <div className="relative z-10 text-center">
                  <h3 className="mt-2 font-bold text-lg">{book.name}</h3>
                  <p className="text-sm text-gray-300">{book.category}</p>
                  <p className="text-lg text-yellow-400 mt-2">Free</p>
                </div>
              </CardSpotlight>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CardSlider;
