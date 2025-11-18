


// import React, { useState, useEffect } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import "./JoinNow.css";
// import gymBoard from "./assets/gym-room.jpg";
// import { Link, useNavigate } from "react-router-dom";
// import api from "./api/api"; // ✅ base axios instance (configured separately)

// const JoinNow = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLogin, setIsLogin] = useState(false); 
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     plan: "",
//   });

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   useEffect(() => {
//     setIsLogin(false);
//   }, []);

//   // ✅ Handle Registration (Signup)
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (!userData.name || !userData.email || !userData.password) {
//       alert("Please fill all required fields!");
//       return;
//     }
//     if (userData.password !== userData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await api.post("/register", {
//         name: userData.name,
//         email: userData.email,
//         password: userData.password,
//         confirmPassword: userData.confirmPassword,
//         phone: userData.phone,
//         plan: userData.plan,
//       });

//       if (response.status === 201 || response.status === 200) {
//         alert("🎉 Registration Successful! Please login now.");
//         setIsLogin(true);
//       }
//     } catch (error) {
//       console.error("Registration failed:", error);
//       alert(error.response?.data?.detail || "Registration failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle Login (Signin)
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!loginData.email || !loginData.password) {
//       alert("Please enter email and password!");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await api.post("/login", {
//         email: loginData.email,
//         password: loginData.password,
//       });

//       if (response.status === 200) {
//         const { access_token, user } = response.data;

//         // ✅ Store token for authenticated API calls
//         sessionStorage.setItem("token", access_token);
//         localStorage.setItem("token", access_token);


//         alert(`Welcome back, ${user.name || "User"}!`);
//         navigate("/whychooseus");
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert(error.response?.data?.detail || "Invalid credentials. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="join-container">
//       <div className="join-form">
//         <h2 className="join-heading">
//           {isLogin ? "Welcome Back to" : "Ready to Join"} <span>Fitnexa</span>
//           <img src={gymBoard} alt="Gym" className="heading-icon" />
//         </h2>

//         {/* ✅ Registration Form */}
//         {!isLogin ? (
//           <form onSubmit={handleRegister}>
//             <div className="form-group">
//               <label>Full Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 value={userData.name}
//                 onChange={(e) =>
//                   setUserData({ ...userData, name: e.target.value })
//                 }
//               />
//             </div>

//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={userData.email}
//                 onChange={(e) =>
//                   setUserData({ ...userData, email: e.target.value })
//                 }
//               />
//             </div>

//             <div className="form-group password-field">
//               <label>Password</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter password"
//                 value={userData.password}
//                 onChange={(e) =>
//                   setUserData({ ...userData, password: e.target.value })
//                 }
//               />
//               <span
//                 className="eye-icon"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

//             <div className="form-group password-field">
//               <label>Confirm Password</label>
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirm password"
//                 value={userData.confirmPassword}
//                 onChange={(e) =>
//                   setUserData({ ...userData, confirmPassword: e.target.value })
//                 }
//               />
//               <span
//                 className="eye-icon"
//                 onClick={() =>
//                   setShowConfirmPassword(!showConfirmPassword)
//                 }
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

//             <div className="form-group phone-field">
//               <label>Phone Number</label>
//               <div className="phone-input">
//                 <span className="phone-prefix">+91</span>
//                 <input
//                   type="tel"
//                   placeholder="Enter number"
//                   value={userData.phone}
//                   onChange={(e) =>
//                     setUserData({ ...userData, phone: e.target.value })
//                   }
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Membership Plan</label>
//               <select
//                 value={userData.plan}
//                 onChange={(e) =>
//                   setUserData({ ...userData, plan: e.target.value })
//                 }
//               >
//                 <option>Select Plan</option>
//                 <option>Basic</option>
//                 <option>Standard</option>
//                 <option>Premium</option>
//               </select>
//             </div>

//             <button type="submit" className="join-btn" disabled={loading}>
//               {loading ? "Registering..." : "🔥 Register Now"}
//             </button>

//             <p className="login-link">
//               Already have an account?{" "}
//               <span
//                 onClick={() => setIsLogin(true)}
//                 style={{ color: "#007bff", cursor: "pointer" }}
//               >
//                 Login here
//               </span>
//             </p>
//           </form>
//         ) : (
//           // ✅ Login Form
//           <form onSubmit={handleLogin}>
//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={loginData.email}
//                 onChange={(e) =>
//                   setLoginData({ ...loginData, email: e.target.value })
//                 }
//               />
//             </div>

//             <div className="form-group password-field">
//               <label>Password</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter password"
//                 value={loginData.password}
//                 onChange={(e) =>
//                   setLoginData({ ...loginData, password: e.target.value })
//                 }
//               />
//               <span
//                 className="eye-icon"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

//             <button type="submit" className="join-btn" disabled={loading}>
//               {loading ? "Logging in..." : "🔑 Login"}
//             </button>

//             <p className="login-link">
//               Don’t have an account?{" "}
//               <span
//                 onClick={() => setIsLogin(false)}
//                 style={{ color: "#007bff", cursor: "pointer" }}
//               >
//                 Register here
//               </span>
//             </p>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JoinNow;


import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./JoinNow.css";
import gymBoard from "./assets/gym-room.jpg";
import { useNavigate } from "react-router-dom";
import api from "./api/api"; // ✅ base axios instance

const JoinNow = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    plan: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // ✅ Redirect if token exists
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/whychooseus"); // Skip login/register if already logged in
    } else {
      setIsLogin(false);
    }
  }, [navigate]);

  // ✅ Handle Registration (Signup)
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!userData.name || !userData.email || !userData.password) {
      alert("Please fill all required fields!");
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/register", userData);
      if (response.status === 200 || response.status === 201) {
        alert("🎉 Registration Successful! Please login now.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Login (Signin)
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      alert("Please enter email and password!");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/login", loginData);
      if (response.status === 200) {
        const { access_token, user } = response.data;
        sessionStorage.setItem("token", access_token);
        localStorage.setItem("token", access_token);
        alert(`Welcome back, ${user.name || "User"}!`);
        navigate("/whychooseus");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.detail || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ If token exists, don't render form (optional fallback)
  if (sessionStorage.getItem("token")) {
    return null; // nothing will show since navigate() already redirects
  }

  return (
    <div className="join-container">
      <div className="join-form">
        <h2 className="join-heading">
          {isLogin ? "Welcome Back to" : "Ready to Join"} <span>Fitnexa</span>
          <img src={gymBoard} alt="Gym" className="heading-icon" />
        </h2>

        {/* ✅ Registration Form */}
        {!isLogin ? (
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </div>

            <div className="form-group password-field">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="form-group password-field">
              <label>Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={userData.confirmPassword}
                onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
              />
              <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="form-group phone-field">
              <label>Phone Number</label>
              <div className="phone-input">
                <span className="phone-prefix">+91</span>
                <input
                  type="tel"
                  placeholder="Enter number"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Membership Plan</label>
              <select
                value={userData.plan}
                onChange={(e) => setUserData({ ...userData, plan: e.target.value })}
              >
                <option>Select Plan</option>
                <option>Basic</option>
                <option>Standard</option>
                <option>Premium</option>
              </select>
            </div>

            <button type="submit" className="join-btn" disabled={loading}>
              {loading ? "Registering..." : "🔥 Register Now"}
            </button>

            <p className="login-link">
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)} style={{ color: "#007bff", cursor: "pointer" }}>
                Login here
              </span>
            </p>
          </form>
        ) : (
          // ✅ Login Form
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
            </div>

            <div className="form-group password-field">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit" className="join-btn" disabled={loading}>
              {loading ? "Logging in..." : "🔑 Login"}
            </button>

            <p className="login-link">
              Don’t have an account?{" "}
              <span onClick={() => setIsLogin(false)} style={{ color: "#007bff", cursor: "pointer" }}>
                Register here
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default JoinNow;

