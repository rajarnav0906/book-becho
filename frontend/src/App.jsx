import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Books from "./pages/Books";
import SignUp from "./components/SignUp";
import ViewBookDetails from "./components/ViewBookDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/book/:id" element={<ViewBookDetails />} />
      
    </Routes>
  );
}

export default App;
