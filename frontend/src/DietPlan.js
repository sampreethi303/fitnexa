

import React, { useState } from "react";
import axios from "axios";
import "./DietPlan.css";
import PlanDisplay from "./PlanDisplay";
export default function DietPlan() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    goal: "",
    number_of_weeks: "",
    food_preference: "",
  });

  const [dietPlan, setDietPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

try {
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:8000/api/dietplan",
    {
      name: formData.name,
      gender: formData.gender,
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
      goal: formData.goal,
      number_of_weeks: Number(formData.number_of_weeks),
      food_preference: formData.food_preference,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  setDietPlan(response.data);
} catch (error) {
  console.error("Error generating diet plan:", error);
  alert(error.response?.data?.detail || "Failed to generate diet plan. Please try again.");
} finally {
  setLoading(false);
}
  };

  if (dietPlan) {
      return <PlanDisplay plan={dietPlan.diet_plan} onBack={() => setDietPlan(null)} type = "diet"/>;
    }
  return (
    <div className="diet-container">
      <form className="diet-form" onSubmit={handleSubmit}>
        <h2 className="diet-title">Diet Plan Form</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="diet-input"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <select
          name="gender"
          className="diet-input"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          className="diet-input"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="height"
          placeholder="Enter Height (cm)"
          className="diet-input"
          value={formData.height}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="weight"
          placeholder="Enter Weight (kg)"
          className="diet-input"
          value={formData.weight}
          onChange={handleChange}
          required
        />

        <select
          name="goal"
          className="diet-input"
          value={formData.goal}
          onChange={handleChange}
          required
        >
          <option value="">Select Goal</option>
          <option value="loss">Weight Loss</option>
          <option value="maintain">Maintain</option>
          <option value="gain">Muscle Gain</option>
        </select>

        <select
          name="food_preference"
          className="diet-input"
          value={formData.food_preference}
          onChange={handleChange}
          required
        >
          <option value="">Food Preference</option>
          <option value="veg">Vegetarian</option>
          <option value="nonveg">Non-Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="eggetarian">Eggetarian</option>
        </select>

        <input
          type="number"
          name="number_of_weeks"
          placeholder="Number of Weeks"
          className="diet-input"
          value={formData.number_of_weeks}
          onChange={handleChange}
          required
          min="1"
          max="12"
        />

        <button type="submit" className="diet-btn" disabled={loading}>
          {loading ? "Generating..." : "Get My Diet Plan"}
        </button>
      </form>

    </div>
  );
}
