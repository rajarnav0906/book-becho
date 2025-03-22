import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CardSlider from "./components/CardSlider";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/list.json") // Fetch from public folder
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((data) => {
        // Filter only free books (price === 0)
        const freeBooks = data.filter((book) => book.price === 0);
        setCards(freeBooks);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <Navbar />
      <Hero />

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : cards.length === 0 ? (
          <p className="text-white text-center">No free books available</p>
        ) : (
          <CardSlider cards={cards} />
        )}
      </motion.div>

      <Footer />
    </motion.div>
  );
}

export default App;
