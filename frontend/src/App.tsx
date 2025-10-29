import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";
import Result from "./pages/Result";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experiences/:id" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </main>
    </div>
  );
}
