import React, { useState, useEffect } from 'react';
import './ItalyDestination.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { FaPhoneAlt } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion'; // AnimatePresence add kiya layout transitions ke liye

export default function ItalyDestination() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const whatsappLink = "https://wa.me/917982295530?text=Hi,%20I'm%20interested%20in%20studying%20in%20Italy.%20Please%20help%20me%20with%20English-taught%20courses,%20EDISU%20scholarships,%20and%20the%20visa%20process.";

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ==========================================
  // MASTER ANIMATION SYSTEM (GLOBAL CONFIGS)
  // ==========================================
  
  const containerStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const smoothFadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.65, ease: [0.215, 0.610, 0.355, 1] } 
    }
  };

  const hoverCardEffect = {
    y: -8,
    scale: 1.015,
    boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.12)",
    transition: { duration: 0.3, ease: "easeInOut" }
  };

  const interactiveButton = {
    hover: { scale: 1.03, transition: { duration: 0.2, ease: "easeInOut" } },
    tap: { scale: 0.97 }
  };

  return (
    <>
      <Navbar />
      <div className="ita-page-wrapper">

        {/* ==========================================
            SECTION 1: HERO BANNER (Scale & Reveal)
           ========================================== */}
        <motion.header 
          className="ita-hero-banner"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="ita-hero-inner">
            <div className="ita-hero-right">
              <motion.div 
                className="ita-flag-wrap"
                initial={{ scale: 0, rotate: -25 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 90, damping: 12, delay: 0.4 }}
              >
                <span className="ita-flag-emoji"></span>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* ==========================================
            SECTION 2: MASTER BODY LAYOUT GRID
           ========================================== */}
        <div className="ita-main-grid">

          {/* LEFT SIDEBAR (Sticky Navigation & Contact Block) */}
          <motion.aside 
            className="ita-sidebar"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          >
            {/* Appointment / Call Card */}
            <motion.div 
              className="ita-call-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span className="ita-call-label">Our Appointment Service call us</span>
              <a href="tel:+917982295530" className="ita-phone-link">
                <div className='contact-item'>
                  <FaPhoneAlt className="contact-icon"/>
                  <span>+91 7982295530</span>
                </div>
              </a>
            </motion.div>

            {/* WhatsApp Info Card */}
            <motion.div 
              className="ita-wa-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div className="ita-wa-header">
                <motion.div 
                  className="ita-wa-icon"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <svg viewBox="0 0 448 512" width="24" height="24" fill="#ffffff">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157z"/>
                  </svg>
                </motion.div>
                <div className="ita-wa-meta">
                  <h4>Academic Support</h4>
                  <p>Online • Advisors Ready</p>
                </div>
              </div>
              <div className="ita-wa-body">
                <p>Connect with our expert Italy advisors for explicit guidance on fully-funded regional scholarships, 100% tuition waivers, block visa processing, and university pre-enrollments.</p>
                <motion.a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ita-wa-btn"
                  variants={interactiveButton}
                  whileHover="hover"
                  whileTap="tap"
                >
                  START CHAT NOW
                </motion.a>
              </div>
            </motion.div>
          </motion.aside>

          {/* RIGHT CONTENT PANEL (Scroll-Driven Architecture) */}
          <main className="ita-content-panel">

            {/* Block 1: Introduction */}
            <motion.section 
              className="ita-copy-block"
              variants={smoothFadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <h2 className="ita-section-title">Study in Italy: It's easier than you think!</h2>
              <p className="ita-section-para">
                Italy is rapidly becoming the top destination for global students seeking world-class education with minimal financial burden. Offering thousands of entirely English-taught bachelors and masters programs, Italian public universities combine historic academic excellence with massive state-sponsored financial frameworks.
              </p>
            </motion.section>

            {/* Block 2: Value Proposition */}
            <motion.section 
              className="ita-copy-block"
              variants={smoothFadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <h2 className="ita-section-title">Why study in Italy?</h2>
              <p className="ita-section-para">
                Italy stands unique in Europe due to its generous regional scholarship structure (such as DSU, EDISU, and LazioDisco). Eligible international students can secure completely zero-tuition education along with a yearly cash stipend ranging from €6,000 to €7,000 to cover accommodation and meals comfortably, all while exploring a rich Mediterranean culture.
              </p>
            </motion.section>

            {/* SECTION 3: FEATURE CARDS GRID (Staggered Children Reveal) */}
            <motion.section 
              className="ita-features-grid"
              variants={containerStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Card 1 */}
              <motion.div className="ita-feature-card" variants={smoothFadeInUp} whileHover={hoverCardEffect}>
                <div className="ita-icon-badge">
                  <span className="ita-icon-graphic">💶</span>
                </div>
                <h3 className="ita-card-title">Affordable / Funded</h3>
                <p className="ita-card-text">
                  Access extensive regional scholarship programs that grant full tuition waivers and provide yearly cash maintenance funds.
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div className="ita-feature-card" variants={smoothFadeInUp} whileHover={hoverCardEffect}>
                <div className="ita-icon-badge">
                  <span className="ita-icon-graphic">💬</span>
                </div>
                <h3 className="ita-card-title">English-Taught</h3>
                <p className="ita-card-text">
                  No Italian language barrier—choose from hundreds of programs tailored specifically for global applicants in top public sectors.
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div className="ita-feature-card" variants={smoothFadeInUp} whileHover={hoverCardEffect}>
                <div className="ita-icon-badge">
                  <span className="ita-icon-graphic">🇪🇺</span>
                </div>
                <h3 className="ita-card-title">Schengen Mobility</h3>
                <p className="ita-card-text">
                  A student visa from Italy grants you restriction-free travel and corporate internship access across 29 European countries.
                </p>
              </motion.div>
            </motion.section>

            {/* SECTION 4: CTA ACTION BLOCK */}
            <motion.section 
              className="ita-cta-block"
              variants={smoothFadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <span className="ita-cta-tagline">UNLOCK YOUR FUTURE IN EUROPE</span>
              <h2 className="ita-cta-heading">Explore Universities and Scholarships in Italy</h2>
              <p className="ita-cta-lead">Launch your higher education with zero tuition fees across historic Italian cities.</p>
              <p className="ita-cta-sub">
                From Milan's business avenues to Rome's engineering hubs, Italy offers high-reputation qualifications without the premium debt. Ready to file your pre-enrollment applications?
              </p>
              <div className="ita-btn-row">
                <motion.a 
                  href={whatsappLink} target="_blank" rel="noopener noreferrer" className="ita-primary-btn"
                  variants={interactiveButton} whileHover="hover" whileTap="tap"
                >
                  EXPLORE UNIVERSITIES
                </motion.a>
                <motion.a 
                  href={whatsappLink} target="_blank" rel="noopener noreferrer" className="ita-primary-btn"
                  variants={interactiveButton} whileHover="hover" whileTap="tap"
                >
                  FIND SCHOLARSHIPS
                </motion.a>
              </div>
            </motion.section>

          </main>
        </div>

        {/* FLOATING ACTION INTERACTION (AnimatePresence Handling) */}
        <AnimatePresence>
          <motion.a 
            href={whatsappLink} 
            className="ita-wa-bubble" 
            target="_blank" 
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
            whileHover={{ scale: 1.12, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <span>💬</span>
          </motion.a>
        </AnimatePresence>

      </div>
      <Footer />
    </>
  );
}