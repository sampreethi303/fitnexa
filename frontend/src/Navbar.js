import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar">
      <h1 className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        FitNexa
      </h1>
      <ul className="nav-links">
        <li
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          Home
        </li>
        <li
          className={`nav-link ${location.pathname === "/dietplan" ? "active" : ""}`}
          onClick={() => navigate("/dietplan")}
        >
          Diet Plan
        </li>
        <li
          className={`nav-link ${location.pathname === "/workout" ? "active" : ""}`}
          onClick={() => navigate("/workout")}
        >
          Workout
        </li>
        <li
          className={`nav-link ${location.pathname === "/consultant" ? "active" : ""}`}
          onClick={() => navigate("/consultant")}
        >
          Consultant
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
