import React, { useState } from "react";
import PlanDisplay from "./PlanDisplay";
import "./Workout.css";
import axios from "axios";

export default function Workout() {
  const [formData, setFormData] = useState({
    workout_type: "",
    diet_type: "",
    current_weight: "",
    target_weight: "",
    dietary_restrictions: "",
    health_conditions: "",
    age: "",
    gender: "",
    number_of_weeks: "",
    comments: "",
  });

  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

        try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      console.log("Form data being sent:", formData);

      const response = await axios.post(
        "http://localhost:8000/api/workoutplan",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Backend response:", response.data);
      setWorkoutPlan(response.data.workout_plan);
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating workout plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
      };

      if (workoutPlan) {
        return <PlanDisplay plan={workoutPlan} onBack={() => setWorkoutPlan(null)} type = "workout"/>;
      }

  return (
    <div className="workout-container">
      <h1 className="title">Build Your Perfect Plan</h1>
      <p className="subtitle">Get a personalized workout and diet plan tailored for you</p>

      <form className="workout-form" onSubmit={handleSubmit}>
        <label>
          Workout Goal:
          <select
            value={formData.workout_type}
            onChange={(e) => handleChange("workout_type", e.target.value)}
            required
          >
            <option value="">Select Goal</option>
            <option value="muscleGain">Muscle Gain</option>
            <option value="fatLoss">Fat Loss</option>
            <option value="strength">Strength</option>
            <option value="flexibility">Flexibility</option>
          </select>
        </label>

        <label>
          Diet Type:
          <select
            value={formData.diet_type}
            onChange={(e) => handleChange("diet_type", e.target.value)}
            required
          >
            <option value="">Select Diet</option>
            <option value="veg">Vegetarian</option>
            <option value="nonveg">Non-Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="eggetarian">Eggetarian</option>
          </select>
        </label>

        <label>
          Current Weight (kg):
          <input
            type="number"
            value={formData.current_weight}
            onChange={(e) => handleChange("current_weight", e.target.value)}
            required
          />
        </label>

        <label>
          Target Weight (kg):
          <input
            type="number"
            value={formData.target_weight}
            onChange={(e) => handleChange("target_weight", e.target.value)}
            required
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleChange("age", e.target.value)}
            required
          />
        </label>

        <label>
          Gender:
          <select
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Duration (Weeks):
          <input
            type="number"
            value={formData.number_of_weeks}
            onChange={(e) => handleChange("number_of_weeks", e.target.value)}
            required
          />
        </label>

        <label>
          Dietary Restrictions:
          <input
            type="text"
            value={formData.dietary_restrictions}
            onChange={(e) => handleChange("dietary_restrictions", e.target.value)}
            placeholder="e.g. No dairy, gluten-free"
          />
        </label>

        <label>
          Health Conditions:
          <input
            type="text"
            value={formData.health_conditions}
            onChange={(e) => handleChange("health_conditions", e.target.value)}
            placeholder="e.g. Asthma, knee injury"
          />
        </label>

        <label>
          Additional Comments:
          <textarea
            value={formData.comments}
            onChange={(e) => handleChange("comments", e.target.value)}
            placeholder="Any other preferences or details..."
          ></textarea>
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate My Plan"}
        </button>
      </form>
    </div>
  );
}
