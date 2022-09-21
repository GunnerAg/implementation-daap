import React from "react";
import Create from "./components/Create";
import Profile from "./components/Profile";
import Intro from "./components/Intro";
import MarketPlace from "./components/MarketPlace";
import ScrollToTop from "./components/ScrollToTop";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

export default function App() {
  return (
    <div id="App">
      <ScrollToTop />
      <Intro />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/marketplace" element={<MarketPlace />} />
      </Routes>
    </div>
  );
}
