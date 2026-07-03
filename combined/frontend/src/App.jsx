import React, { useState, useEffect } from "react"; // 👈 useState aur useEffect import kiya
import AppRoutes from "./routes/AppRoutes";
import { FaChevronUp } from "react-icons/fa";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import logo from "./assets/vietworldgate.png"; // 👈 Yahan apne logo ka sahi path daal dena
import   SwinburneBanner from "./components/SwinburneBanner"
function App() {
  const [loading, setLoading] = useState(false); // 👈 Splash screen ke liye state

  useEffect(() => {
    // 2 seconds baad loading ko false kar dega
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Agar loading true hai toh sirf logo dikhega
  if (loading) {
    return (
      <div className="splash-screen">
        <img src={logo} alt="Loading Logo" className="splash-logo" />
      </div>
    );
  }

  // Jaise hi loading false hogi, aapki puri website load ho jayegi
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