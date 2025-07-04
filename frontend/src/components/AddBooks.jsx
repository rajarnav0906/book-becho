import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader.jsx";
import { motion } from "framer-motion";

const AddBook = () => {
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    author: "",
    condition: "Good",
    description: "",
    price: "",
    contactPhone: "",
    contactEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const token = localStorage.getItem("token"); // Assuming you store token in localStorage

      const response = await axios.post(
        "http://localhost:4001/api/v1/add-book",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMsg("Book added successfully!");
      setFormData({
        url: "",
        title: "",
        author: "",
        condition: "Good",
        description: "",
        price: "",
        contactPhone: "",
        contactEmail: "",
      });
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <motion.div
      className="relative bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-black p-8 min-h-screen flex justify-center items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Glow Backgrounds */}
      <div className="absolute top-[-150px] right-[-150px] w-[300px] h-[300px] bg-[#6fc1ff33] rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-150px] left-[-150px] w-[300px] h-[300px] bg-[#b6d07a33] rounded-full blur-3xl z-0" />

      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 bg-[#1a1a1a] p-8 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col gap-6"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center text-2xl md:text-3xl font-bold text-[#b6d07a] mb-2">
          📚 Add a New Book
        </h2>

        {/* Success or Error Messages */}
        {successMsg && <p className="text-green-400 text-center">{successMsg}</p>}
        {errorMsg && <p className="text-red-400 text-center">{errorMsg}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="url"
            placeholder="Image URL"
            value={formData.url}
            onChange={handleChange}
            required
            className="bg-[#0f0f0f] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b6d07a]"
          />
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="bg-[#0f0f0f] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b6d07a]"
          />
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={formData.author}
            onChange={handleChange}
            required
            className="bg-[#0f0f0f] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b6d07a]"
          />
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="bg-[#0f0f0f] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b6d07a]"
          >
            <option value="New">New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price ($)"
            value={formData.price}
            onChange={handleChange}
            required
            className="bg-[#0f0f0f] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b6d07a]"
          />
          <input
            type="text"
            name="contactPhone"
            placeholder="Contact Phone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
            className="bg-[#0f0f0f] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b6d07a]"
          />
          <input
            type="email"
            name="contactEmail"
            placeholder="Contact Email"
            value={formData.contactEmail}
            onChange={handleChange}
            required
            className="bg-[#0f0f0f] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b6d07a]"
          />
        </div>

        <textarea
          name="description"
          placeholder="Book Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="bg-[#0f0f0f] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b6d07a]"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-[#b6d07a] text-black font-semibold py-3 rounded-lg hover:bg-[#a2bb6d] transition duration-300"
        >
          Add Book
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AddBook;
