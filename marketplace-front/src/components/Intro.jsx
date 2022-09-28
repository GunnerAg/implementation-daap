import React from "react";
import "../styles/intro.scss";
import Navbar from "./Navbar";
import "../styles/intro.scss";

export default function Intro() {
  return (
    <section className="Intro">
      <Navbar />
      <div className="container">
        <div className="content">
          <h1>
            Explore Our <i> cool </i> NFT Marketplace
          </h1>
          <div className="data">
            <div className="dataTab">
              <h2>40K</h2>
              <h5>of nothing</h5>
            </div>
            <div className="dataTab">
              <h2>12K</h2>
              <h5>of ... also nothing</h5>
            </div>
            <div className="dataTab">
              <h2>20K</h2>
              <h5>of all but nothing</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
