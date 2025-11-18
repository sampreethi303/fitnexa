import React from "react";
import "./WhyChooseUs.css";
import { Link } from "react-router-dom";   // ✅ Import Link

import appleIcon from "./assets/apple.png";
import chartIcon from "./assets/chart.png";
import dumbbellIcon from "./assets/dumbbell.png";
import robotIcon from "./assets/robot.png";

function WhyChooseUs() {
  return (
    <div className="why-container">
      {/* Title */}
      <h1 className="why-title">Why <span>Choose Us?</span></h1>
      <h3 className="section-desc">
Transform your health with FitNexa — where data meets discipline. 
Start your AI-powered fitness plan today!
</h3>
      
<h3 className="section-desc">
We combine AI intelligence with expert fitness strategies to deliver 
customized results — faster and more effectively than traditional plans.
</h3>


      {/* Features */}
      <div className="why-features">
        <div className="feature-card">
          <img src={appleIcon} alt="Diet" />
          <h3>Personalized Diet</h3>
          <p>AI meal plans for your lifestyle.</p>
          <Link to="/dietplan">
          <button className="cta-btn">DietPlan</button>
        </Link>
        </div>
        <div className="feature-card">
          <img src={dumbbellIcon} alt="Workout" />
          <h3>Workout Plans</h3>
          <p>Smart routines for faster results.</p>
          <Link to="/workout">
          <button className="cta-btn">Gym</button>
        </Link>
        </div>
        <div className="feature-card">
          <img src={chartIcon} alt="Tracking" />
          <h3>Progress Tracking</h3>
          <p>Track calories & workouts easily.</p>
          <Link to="/progress">
          <button className="cta-btn">Track</button>
        </Link>
        </div>
        <div className="feature-card">
          <img src={robotIcon} alt="AI Consultant" />
          <h3>AI Consultant</h3>
          <p>24/7 virtual fitness assistant.</p>
          <Link to="/consultant">
          <button className="cta-btn">24/7</button>
        </Link>
        </div>
      </div>

      {/* CTA
      /<div className="why-cta">
        <h2>Ready to Begin Your Fitness Journey?</h2>
        
        <Link to="/join">
          <button className="cta-btn">Join Now</button>
        </Link>
      </div> */}
    </div>
  );
}

export default WhyChooseUs;
