import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  return (
    <div className="home">

      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>SHAPE IT UP!</h1>
          <p>Get Fit, Don’t Quit</p>

          {/* ✅ Join Now goes to WhyChooseUs page */}
          <Link to="/join">
            <button className="btn">Join Now</button>
            
          </Link>
        </div>
      </header>

    </div>
  );
}

export default Home;
