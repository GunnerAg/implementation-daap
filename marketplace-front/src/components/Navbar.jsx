import React, { useState } from "react";
import { logo } from "../assets";
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import '../styles/navbar.scss';

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const html = document.querySelector("html");
  html.addEventListener("click", (e) => setIsNavOpen(false));

  return (
    <div className="Navbar" state={isNavOpen ? 1 : 0}>
      <div className="brand">
        <img src={logo} alt="logo" />
      </div>
      <div className="toggle">
        {isNavOpen ? (
          <MdClose onClick={() => setIsNavOpen(false)} />
        ) : (
          <GiHamburgerMenu
            onClick={(e) => {
              e.stopPropagation();
              setIsNavOpen(true);
            }}
          />
        )}
      </div>
      <div className={`links ${isNavOpen ? "show" : ""}`}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/marketplace">Marketplace</a>
          </li>
          <li>
            <a href="/create">Create</a>
          </li>
          <li>
            <a href="/profile">My Collectibles</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
