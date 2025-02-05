"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

let interval: any;

type Card = {
  id: number;
  name: string;
  category: string;
  title: string;
  image: string;
  price: number;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 3000);
  };

  return (
    <div className="relative h-600 w-60 mt-50 md:h-80 md:w-72">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute dark:bg-black bg-white h-60 w-60 md:h-80 md:w-72 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
          style={{
            transformOrigin: "top center",
          }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
            zIndex: cards.length - index, // decrease z-index for the cards that are behind
          }}
        >
          <div className="flex-1">
            <div className="font-normal text-neutral-700 dark:text-neutral-200 mb-2">
              {card.category}
            </div>
            <img src={card.image} alt={card.title} className="w-full h-32 object-cover rounded-md mb-2" />
            <p className="text-neutral-500 font-medium dark:text-white">
              {card.name}
            </p>
            <p className="text-neutral-400 font-normal dark:text-neutral-200">
              {card.title}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
