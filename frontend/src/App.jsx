import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Books from "./pages/Books";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/signup" element={<SignUp />} />
      
    </Routes>
  );
}

export default App;
