import React, { useState, useEffect } from "react"; 
import AppRoutes from "./routes/AppRoutes";
import { FaChevronUp } from "react-icons/fa";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import logo from "./assets/vietworldgate.png"; 
import   SwinburneBanner from "./components/SwinburneBanner"
function App() {
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer); 
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  
  if (loading) {
    return (
      <div className="splash-screen">
        <img src={logo} alt="Loading Logo" className="splash-logo" />
      </div>
    );
  }

  
  return (
    <>
      <SwinburneBanner />
      {/* ✅ AUTO SCROLL TOP ON PAGE CHANGE */}
      <ScrollToTop />

      {/* ✅ ROUTES */}
      <AppRoutes />

      {/* ✅ SCROLL TO TOP BUTTON */}
      <a
        href="#"
        className="scroll-top"
        className="scroll-top"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FaChevronUp />
      </a>
    </>
  );
}

export default App;