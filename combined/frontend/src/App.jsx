import React, { useState, useEffect } from "react"; 
import AppRoutes from "./routes/AppRoutes";
import { FaChevronUp } from "react-icons/fa";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import logo from "./assets/vietworldgate.png"; 
import SwinburneBanner from "./components/SwinburneBanner";
import { LoginModalProvider } from "./portal/context/LoginModalContext";

import LoginModal from "./components/LoginModal";
import { AuthProvider } from "./portal/context/AuthContext";

function App() {
  const [loading, setLoading] = useState(false); 

  // ✅ sessionStorage har naye tab ke liye alag hota hai —
  // isliye banner har naye tab me pehli baar dikhega,
  // lekin usi tab me reload/navigate karne pe dobara nahi dikhega.
  const [showBanner, setShowBanner] = useState(() => {
    return !sessionStorage.getItem("swinburneBannerShown");
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer); 
  }, []);

  useEffect(() => {
    // ✅ jaise hi banner render ho, is tab ke liye flag set kar do
    if (showBanner) {
      sessionStorage.setItem("swinburneBannerShown", "true");
    }
  }, [showBanner]);

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
    <AuthProvider>
      <LoginModalProvider>

        {/* ✅ Banner sirf isi tab me pehli baar dikhega */}
        {showBanner && <SwinburneBanner />}

        <ScrollToTop />
        <AppRoutes />
        <LoginModal />

        <a href="#"
          className="scroll-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <FaChevronUp />
        </a>

      </LoginModalProvider>
    </AuthProvider>
  );
}

export default App;