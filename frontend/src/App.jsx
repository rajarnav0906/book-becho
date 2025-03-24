import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Books from "./pages/Books";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books />} />
      
    </Routes>
  );
}

export default App;
