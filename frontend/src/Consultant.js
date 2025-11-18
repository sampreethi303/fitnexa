import React, { useState } from "react";
import { FaRobot, FaDumbbell, FaHeartbeat, FaComments } from "react-icons/fa";
import "./Consultant.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Consultant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { from: "ai", text: "👋 Hi! I’m your FitNexa AI coach. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessages((prev) => [
          ...prev,
          { from: "ai", text: "⚠️ Please login first to chat with the AI consultant." },
        ]);
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/chat",
        { question: input },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Chat response:", response.data);
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: response.data.response || "🤖 No response received." },
      ]);
    } catch (error) {
      let errorMsg = "⚠️ Failed to reach server. Please try again later.";
      if (error.response) {
        errorMsg = `❌ ${error.response.data.detail || "Something went wrong."}`;
      }
      setMessages((prev) => [...prev, { from: "ai", text: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consultant-page">
      {/* Hero Section */}
      <section className="hero-section">
        <FaRobot className="hero-icon" />
        <h1>Meet Your AI Fitness Consultant 🤖</h1>
        <p>24/7 guidance, motivation & personalized health support — anytime, anywhere.</p>
      </section>

      {/* Consultant Cards */}
      <section className="consultant-cards">
        <div className="card">
          <FaDumbbell className="icon green" />
          <h3>Workout Guidance</h3>
          <p>Get AI-recommended exercises tailored to your goals and fitness level.</p>
        </div>

        <div className="card">
          <FaHeartbeat className="icon red" />
          <h3>Health Monitoring</h3>
          <p>Track your progress, sleep, and diet — and receive smart suggestions.</p>
        </div>

        <div className="card">
          <FaComments className="icon blue" />
          <h3>Live Chat Support</h3>
          <p>Chat with our AI assistant or connect with real fitness experts anytime.</p>
        </div>
      </section>

      {/* Chat Box */}
      <section className="chat-box">
        <h2>Ask Your AI Consultant</h2>
        <div className="chat-window">
          <div className="messages">
            {messages.map((msg, idx) => (
              <p
                key={idx}
                className={msg.from === "user" ? "user-msg" : "ai-msg"}
              >
                {msg.text}
              </p>
            ))}
            {loading && <p className="ai-msg">🤖 Typing...</p>}
          </div>

          <div className="chat-controls text-black">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your fitness question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="send-btn" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Transform Your Fitness Journey?</h2>
        <button className="join-btn" onClick={() => navigate("/whychooseus")}>Start Now</button>
      </section>
    </div>
  );
};

export default Consultant;
