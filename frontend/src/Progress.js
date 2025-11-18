import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import "./Progress.css";

const Progress = () => {
  const workoutData = [
    { day: "Mon", calories: 220 },
    { day: "Tue", calories: 350 },
    { day: "Wed", calories: 280 },
    { day: "Thu", calories: 400 },
    { day: "Fri", calories: 450 },
    { day: "Sat", calories: 500 },
    { day: "Sun", calories: 320 },
  ];

  const weightData = [
    { week: "Week 1", weight: 68 },
    { week: "Week 2", weight: 67.5 },
    { week: "Week 3", weight: 67 },
    { week: "Week 4", weight: 66.2 },
  ];

  return (
    <div className="progress-page">
      <h1>📈 Your Progress Overview</h1>
      <p>Track your fitness journey and see how far you've come with FitNexa!</p>

      {/* Calories Chart */}
      <div className="chart-card">
        <h3>🔥 Calories Burned This Week</h3>
        <ResponsiveContainer width="95%" height={300}>
          <LineChart data={workoutData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="calories" stroke="#facc15" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Weight Tracking */}
      <div className="chart-card">
        <h3>⚖️ Weight Progress</h3>
        <ResponsiveContainer width="95%" height={300}>
          <BarChart data={weightData}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="weight" fill="#f97316" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AI Insights */}
      <div className="insights">
        <h3>💡 AI Insights</h3>
        <p>Great job! You’ve increased your calorie burn by <strong>25%</strong> since last week!</p>
        <p>Your current consistency rate is <strong>6/7 days</strong> — keep up the momentum 💪</p>
      </div>
    </div>
  );
};

export default Progress;
