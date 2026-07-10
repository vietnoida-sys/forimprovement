import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import logo from "../../assets/vietworldgate.png"; // Import the logo image

export default function Auth() {
  const { login } = useAuth(); // AuthContext for logging in
  const navigate = useNavigate();
  const location = useLocation();

  // Mode state: true = Login, false = Signup
  const [isLogin, setIsLogin] = useState(true);

  // Unified Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "admin@eduadmin.com", // Default for testing
    password: "",
    phone: "",
    role: "counsellor", // Default role matching your schema
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    // Reset inputs except default email/role logic if needed
    setFormData({
      name: "",
      email: isLogin ? "" : "admin@eduadmin.com",
      password: "",
      phone: "",
      role: "counsellor",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // --- LOGIN FLOW ---
        await login(formData.email, formData.password);
        
        navigate("/" );
          window.location.reload();
      } else {
        // --- SIGNUP (REGISTER) FLOW ---
        const response = await fetch("https://forimprovement.onrender.com/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            role: formData.role,
            status: "active", // Default status matching your schema
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Registration failed.");
        }

        // Token management if returned by registration
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Automatically sign in the user if token was received, otherwise switch to login screen
        if (data.token && login) {
          // If you have automatic login on register:
          await login(formData.email, formData.password);
          navigate("/");
        } else {
          // Switch to login screen on success with a visual trigger
          setIsLogin(true);
          alert("Registration successful! Please sign in.");
        }
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    
    <div className="portal-app auth-screen-container">
      <div className="auth-card">
        <div className="auth-brand">
         <img src={logo} alt="logo" className="brand-mark" />
          <span>VIETWORLDGATE</span>
        </div>
        
        <h1>{isLogin ? "Welcome back" : "Create Account"}</h1>
        <p className="subtitle">
          {isLogin 
            ? "Sign in to manage students, leads, and admissions." 
            : "Register to join the portal management system."}
        </p>

        <form onSubmit={handleSubmit}>
          {/* Sign Up Fields Only */}
          {!isLogin && (
            <>
              <div className="field">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                />
              </div>
            </>
          )}

          {/* Common Fields */}
          <div className="field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@eduadmin.com"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="error-box">{error}</div>}

          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button type="button" onClick={toggleMode} className="toggle-link-btn">
            {isLogin ? "Sign up here" : "Sign in here"}
          </button>
        </p>

        {isLogin && (
          <p className="hint">
            First time? Run <code>npm run seed</code> in the backend to create demo logins:<br />
            Admin: <b>admin@eduadmin.com / admin123</b> <br />
            Counsellor: <b>counsellor@eduadmin.com / counsellor123</b>
          </p>
        )}
      </div>


    

      <style>{`
        .auth-screen-container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          
          padding: 20px;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .auth-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 34px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 20px 60px rgba(3, 3, 3, 0.35);
          box-sizing: border-box;
        }
        .auth-brand {
        justify-content: center;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          font-size: 18px;
          margin-bottom: 20px;
          color: #1e293b;
        }

       .brand-mark {
  width: 42px;
  height: 42px;

  background-image: url(./assets/vietworldgate.png);  /* Replace with your actual logo path */
  background-size: contain;   /* image fit kare */
  background-repeat: no-repeat;
  background-position: center;

  border-radius: 8px;
}
        .auth-card h1 { font-size: 22px; margin: 0; color: #0f172a; }
        .subtitle { color: #64748b; font-size: 13.5px; margin: 6px 0 20px; line-height: 1.4; }
        
        .field {
          margin-bottom: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .field label {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
        }
        .field input, .field select {
          padding: 10px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .field input:focus, .field select:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
        }
        
        .btn-primary {
          background: #a6daab;
          color: white;
          justify-content: center;
          padding: 11px;
          border: none;
          border-radius: 6px;
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-primary:hover {
          background: #012819;
        }
        .btn-primary:disabled {
          background: #94a3b8;
          cursor: not-allowed;
        }
        .btn-block {
          width: 100%;
          margin-top: 10px;
        }
        
        .error-box {
          background: #fee2e2;
          color: #991b1b;
          font-size: 13px;
          padding: 10px 12px;
          border-radius: 6px;
          margin-bottom: 12px;
        }
        .toggle-text {
          font-size: 13.5px;
          color: #475569;
          text-align: center;
          margin-top: 20px;
        }
        .toggle-link-btn {
          background: none;
          border: none;
          color: #012819;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          font-size: 13.5px;
          text-decoration: underline;
        }
        .toggle-link-btn:hover {
          color: #050706;
        }
        .hint { font-size: 12px; color: #64748b; margin-top: 22px; text-align: center; line-height: 1.5; }
        .hint code { background: #f1f5f9; padding: 2px 5px; border-radius: 4px; color: #334155; }

        /* Media Queries for responsiveness */
        @media (max-width: 480px) {
          .auth-card {
            padding: 24px 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          }
          .auth-card h1 { font-size: 20px; }
          .subtitle { font-size: 12.5px; }
        }
      `}</style>
    </div>
    <Footer />
      </>
  );
}