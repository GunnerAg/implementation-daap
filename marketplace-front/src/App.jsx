import React from "react";
import { Routes, Route } from "react-router-dom";
import Intro from "./components/Intro";
import Home from "./components/home";
import Footer from "./components/footer";
import Create from "./components/create";
import Marketplace from "./components/marketplace";
import Profile from "./components/profile";


export default function App() {
  return (
    <div id="App">
      <Intro />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
      <Footer />
    </div>
  );
}
