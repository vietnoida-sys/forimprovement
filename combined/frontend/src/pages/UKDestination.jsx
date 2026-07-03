import React, { useState, useEffect } from 'react';
import './UKDestination.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

// --- Production-Grade Scroll Transition Presets ---
const slideUpScroll = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: [0.16, 1, 0.3, 1] // Elegant bezier timing
    } 
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function UKDestination() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Custom pre-filled link optimized for UK student counseling requirements
  const whatsappLink = "https://wa.me/917982295530?text=Hi,%20I'm%20interested%20in%20studying%20in%20the%20UK.%20Please%20guide%20me%20regarding%20universities,%20intakes,%20and%20the%20Graduate%20Route%20visa.";

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <Navbar />
    <div className="global-destination-wrapper">
      
      {/* SECTION 1: Banner Header Component (Triggers on Load) */}
      <header className="dynamic-hero-banners">
        <div className="hero-grid-max">
          <motion.div 
            className="hero-left-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left side content placeholder remains untouched */}
          </motion.div>
          <motion.div 
            className="hero-right-graphic"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="avatar-mask-container">
              <span className="country-large-emoji"></span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* SECTION 2: Master Body Layout Grid */}
      <div className="master-content-layout-grid">
        
        {/* Left Hand Sidebar Widget Stack */}
        <motion.aside 
          className="fixed-width-sidebar"
          variants={slideUpScroll}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Top Embedded Callback Banner */}
          <div className="callback-cta-container">
            <span className="cta-meta-text">Our Appointment Service call us</span>
            <a href="tel:+917982295530" className="phone-interactive-anchor">
              <span className="phone-vector-icon">📞</span> +91-7982295530
            </a>
          </div>

          {/* Form Replaced: Clean Form-Style WhatsApp Integration Box */}
          <div className="sidebar-whatsapp-card">
            <div className="wa-card-header">
              <div className="wa-icon-box">
                <svg viewBox="0 0 448 512" width="24" height="24" fill="#ffffff">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157z"/>
                </svg>
              </div>
              <div className="wa-header-text">
                <h4>Academic Support</h4>
                <p>Online • Advisors Ready</p>
              </div>
            </div>
            
            <div className="wa-card-body">
              <p>Connect with our expert UK advisors for personalized guidance on Russell Group universities, 1-year Masters programs, Graduate Route (PSW) visas, and CAS requirements.</p>
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="wa-action-btn"
              >
                START CHAT NOW
              </a>
            </div>
          </div>
        </motion.aside>

        {/* Right Hand Informative Content Panel */}
        <main className="variable-content-panel">
          
          <motion.section 
            className="copywriting-block"
            variants={slideUpScroll}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <h2 className="section-header-title">Study in UK: It's easier than you think!</h2>
            <p className="section-body-paragraph">
              The United Kingdom houses some of the world's oldest and most prestigious academic institutions. With highly 
              efficient 1-year Masters modules and globally recognized research standards, it offers international students a fast-paced, 
              intense, and incredibly rewarding academic journey.
            </p>
          </motion.section>

          <motion.section 
            className="copywriting-block"
            variants={slideUpScroll}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <h2 className="section-header-title">Why study in UK?</h2>
            <p className="section-body-paragraph">
              UK degrees are intensely valued across business sectors globally. Under the current post-study framework, international graduates 
              can transition effortlessly into the European job sector through the Graduate Route visa, providing up to 2 years of unrestricted 
              professional work rights right after graduation.
            </p>
          </motion.section>

          {/* SECTION 3: Explicit Triple Feature Cards Grid Row */}
          <motion.section 
            className="dynamic-triple-feature-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div className="structural-feature-card" variants={slideUpScroll}>
              <div className="purple-icon-globe-badge">
                <span className="badge-unicode-graphic">👥</span>
              </div>
              <h3 className="card-headline-title">Student-Friendly</h3>
              <p className="card-descriptive-text">
                The UK boast historic student cities with rich cultural heritage, dynamic student unions, and highly inclusive multicultural networks.
              </p>
            </motion.div>

            <motion.div className="structural-feature-card" variants={slideUpScroll}>
              <div className="purple-icon-globe-badge">
                <span className="badge-unicode-graphic">💬</span>
              </div>
              <h3 className="card-headline-title">World-Class Degrees</h3>
              <p className="card-descriptive-text">
                Home to globally benchmarked educational standards that consistently lead global research indexes and corporate job market demands.
              </p>
            </motion.div>

            <motion.div className="structural-feature-card" variants={slideUpScroll}>
              <div className="purple-icon-globe-badge">
                <span className="badge-unicode-graphic">📜</span>
              </div>
              <h3 className="card-headline-title">Diversity Inclusive</h3>
              <p className="card-descriptive-text">
                Universities offer comprehensive student support, rolling scholarship blocks, and dynamic workspaces for international candidates.
              </p>
            </motion.div>
          </motion.section>

          {/* SECTION 4: Lower End Institutional Conversion Box */}
          <motion.section 
            className="lower-conversion-cta-block"
            variants={slideUpScroll}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <span className="meta-tracking-tagline">UNLOCK YOUR FUTURE IN UNITED KINGDOM</span>
            <h2 className="cta-block-main-heading">Explore Universities and Scholarships in UK</h2>
            
            <p className="cta-block-bold-lead">Discover the endless opportunities that await you across British institutions.</p>
            <p className="cta-block-subsidiary-text">
              The United Kingdom offers unmatched heritage paired with practical modern career readiness. Are you prepared to launch your foundational admission and visa workflow today?
            </p>

            <div className="cta-dual-action-row">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="primary-conversion-btn-anchor">
                EXPLORE UNIVERSITIES
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="primary-conversion-btn-anchor">
                FIND SCHOLARSHIPS
              </a>
            </div>
          </motion.section>

        </main>
      </div>

      {/* Floating Action Trigger Widgets */}
      <a href={whatsappLink} className="fixed-chat-trigger-bubble" target="_blank" rel="noopener noreferrer">
        <span className="chat-bubble-inner-icon">💬</span>
      </a>
    </div>
    <Footer />
    </>
  );
}