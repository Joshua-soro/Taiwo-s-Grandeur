import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Rooms from "./pages/Rooms";
import Contact from "./pages/Contact";
import "./App.css";

export default function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("taiwos_grandeur_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("taiwos_grandeur_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (roomId) => {
    setFavorites((prev) =>
      prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId]
    );
  };

  return (
    <div className="app-wrapper">
      <Navbar savedCount={favorites.length} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/rooms"
            element={<Rooms favorites={favorites} onToggleFavorite={toggleFavorite} />}
          />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}