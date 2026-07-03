import React, { useState, useEffect } from 'react';
import './JapanDestination.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

export default function JapanDestination() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Custom pre-filled link optimized for Japan student counseling
  const whatsappLink = "https://wa.me/917982295530?text=Hi,%20I'm%20interested%20in%20studying%20in%20Japan.%20Please%20guide%20me%20regarding%20MEXT%20scholarships,%20language%20schools,%20and%20English-taught%20programs.";

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ==========================================
  // REUSABLE UNIFIED ANIMATION CONFIGS
  // ==========================================
  
  const parentStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const smoothRevealUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.65, ease: [0.215, 0.610, 0.355, 1] } 
    }
  };

  const dynamicSidebar = {
    hidden: { opacity: 0, x: -35 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.65, ease: "easeOut" } 
    }
  };

  const premiumCardHover = {
    y: -8,
    scale: 1.015,
    boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: "easeInOut" }
  };

  const adaptiveButton = {
    hover: { scale: 1.03, transition: { duration: 0.2, ease: "easeInOut" } },
    tap: { scale: 0.97 }
  };

  return (
    <>
      <Navbar />
      <div className="jpn-page-wrapper">
        
        {/* ==========================================
            HERO BANNER SECTION
           ========================================== */}
        <motion.header 
          className="jpn-hero-banner"
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div className="jpn-hero-inner">
            <div className="jpn-hero-left">
              <h1 className="jpn-hero-title"></h1>
            </div>
            <div className="jpn-hero-right">
              <motion.div 
                className="jpn-flag-wrap"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 95, damping: 13, delay: 0.35 }}
              >
                <span className="jpn-flag-emoji"></span>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* ==========================================
            MAIN CORE LAYOUT GRID
           ========================================== */}
        <div className="jpn-main-grid">
          
          {/* SIDEBAR BLOCK */}
          <motion.aside 
            className="jpn-sidebar"
            variants={dynamicSidebar}
            initial="hidden"
            animate="visible"
          >
            {/* Call Card */}
            <motion.div 
              className="jpn-call-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span className="jpn-call-label">Our Appointment Service call us</span>
              <a href="tel:+917982295530" className="jpn-phone-link">
                <span>📞</span> +91-7982295530
              </a>
            </motion.div>

            {/* WhatsApp Card */}
            <motion.div 
              className="jpn-wa-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="jpn-wa-header">
                <motion.div 
                  className="jpn-wa-icon"
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                >
                  <svg viewBox="0 0 448 512" width="24" height="24" fill="#ffffff">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157z"/>
                  </svg>
                </motion.div>
                <div className="jpn-wa-meta">
                  <h4>Japan Support</h4>
                  <p>Online • Advisors Ready</p>
                </div>
              </div>
              
              <div className="jpn-wa-body">
                <p>Connect with our expert Japan advisors for personalized guidance on MEXT scholarships, Japanese language proficiency (JLPT), part-time work rights, and technical internships.</p>
                <motion.a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="jpn-wa-btn"
                  variants={adaptiveButton}
                  whileHover="hover"
                  whileTap="tap"
                >
                  START CHAT NOW
                </motion.a>
              </div>
            </motion.div>
          </motion.aside>

          {/* MAIN INFORMATION CONTENT */}
          <main className="jpn-content">
            
            {/* Intro Block */}
            <motion.section 
              className="jpn-info-block"
              variants={smoothRevealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <h2>Study in Japan: It's easier than you think!</h2>
              <p>
                Japan is an emerging powerhouse for international students, blending cutting-edge technological innovation with deeply rooted cultural traditions. With the "300,000 International Students Plan," Japan has simplified its visa processes and increased English-taught programs across its top-tier national and private universities.
              </p>
            </motion.section>

            {/* Core Why Study Block */}
            <motion.section 
              className="jpn-info-block"
              variants={smoothRevealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <h2>Why study in Japan?</h2>
              <p>
                Beyond its high academic standards, Japan offers one of the safest environments in the world. International students are permitted to work up to 28 hours per week, providing ample opportunity to support living costs. Moreover, the Japanese government offers the prestigious MEXT scholarship, covering full tuition, travel, and providing a monthly stipend for meritorious candidates.
              </p>
            </motion.section>

            {/* FEATURE SHUTTLE CARDS (Staggered Scroll Reveals) */}
            <motion.section 
              className="jpn-features-grid"
              variants={parentStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Card 1 */}
              <motion.div className="jpn-feature-card" variants={smoothRevealUp} whileHover={premiumCardHover}>
                <div className="jpn-icon-circle">
                  <span>👥</span>
                </div>
                <h3>Ultra Safe & Secure</h3>
                <p>
                  Consistently ranked among the top 10 safest countries globally, Japan offers peace of mind for students and their families.
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div className="jpn-feature-card" variants={smoothRevealUp} whileHover={premiumCardHover}>
                <div className="jpn-icon-circle">
                  <span>💬</span>
                </div>
                <h3>Tech Innovation</h3>
                <p>
                  Learn at the heart of robotics, automotive engineering, and electronics in world-class research facilities and laboratories.
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div className="jpn-feature-card" variants={smoothRevealUp} whileHover={premiumCardHover}>
                <div className="jpn-icon-circle">
                  <span>📜</span>
                </div>
                <h3>Post-Study Career</h3>
                <p>
                  Japan actively seeks global talent to join its workforce, offering clear pathways for long-term career growth in local industries.
                </p>
              </motion.div>
            </motion.section>

            {/* MASTER CTA CONVERSION BLOCK */}
            <motion.section 
              className="jpn-cta-section"
              variants={smoothRevealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <span className="jpn-cta-tagline">UNLOCK YOUR FUTURE IN THE LAND OF THE RISING SUN</span>
              <h2 className="jpn-cta-heading">Explore Universities and Scholarships in Japan</h2>
              <p className="jpn-cta-lead">Discover the endless opportunities that await you across Japanese cities.</p>
              <p className="jpn-cta-sub">
                From the bustling streets of Tokyo to the historic halls of Kyoto, Japan offers a unique academic journey. Are you ready to take the first step towards your academic success in Japan?
              </p>

              <div className="jpn-btn-row">
                <motion.a 
                  href={whatsappLink} target="_blank" rel="noopener noreferrer" className="jpn-primary-btn"
                  variants={adaptiveButton} whileHover="hover" whileTap="tap"
                >
                  EXPLORE UNIVERSITIES
                </motion.a>
                <motion.a 
                  href={whatsappLink} target="_blank" rel="noopener noreferrer" className="jpn-primary-btn"
                  variants={adaptiveButton} whileHover="hover" whileTap="tap"
                >
                  FIND SCHOLARSHIPS
                </motion.a>
              </div>
            </motion.section>

          </main>
        </div>

        {/* FLOATING ACTION INTERACTION SYSTEM */}
        <AnimatePresence>
          <motion.a 
            href={whatsappLink} 
            className="jpn-wa-bubble" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Chat on WhatsApp"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 21, delay: 0.4 }}
            whileHover={{ scale: 1.12, y: -4 }}
            whileTap={{ scale: 0.92 }}
          >
            <svg viewBox="0 0 448 512" width="26" height="26" fill="currentColor">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157z"/>
            </svg>
          </motion.a>
        </AnimatePresence>

      </div>
      <Footer />
    </>
  );
}