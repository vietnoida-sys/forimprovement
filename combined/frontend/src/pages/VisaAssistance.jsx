import React from 'react';
import './VisaAssistance.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from 'framer-motion';

// --- Production-Grade Scroll Transition Presets ---
const slideUpScroll = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.55, 
      ease: [0.16, 1, 0.3, 1] // Custom premium easing curve
    } 
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08 // Timing offset between consecutive text items
    }
  }
};

const VisaAssistance = () => {
  return (
    <>
    <Navbar />
    <div className="visa-page-container">
      
      {/* Hero Banner Section */}
      <header className="visaAssistance-hero-banner">
        <div className="hero-overlay">
          <motion.div 
            className="hero-content"
            variants={slideUpScroll}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Nested hero contents if added will auto-trigger */}
          </motion.div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="visa-main-content">
        <div className="visa-grid-container">
          
          {/* Left Column Sidebar (Triggers on scroll) */}
          <motion.aside 
            className="visa-sidebar"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            
            {/* Call Widget */}
            <motion.div className="appointment-call-widget" variants={staggerContainer}>
              <div className="widget-flex">
                <motion.div className="headset-icon" variants={slideUpScroll}>🎧</motion.div>
                <div className="widget-text">
                  <motion.p variants={slideUpScroll}>Book an Appointment with Our Experts</motion.p>
                  <motion.a href="tel:+917982295530" className="phone-number" variants={slideUpScroll}>+91-7982295530</motion.a>
                </div>
              </div>
              <motion.div className="white-arrow-decor" variants={slideUpScroll}>➔</motion.div>
            </motion.div>

            {/* WhatsApp Chat Card */}
            <motion.div className="whatsapp-chat-card" variants={staggerContainer}>
              <div className="wa-card-header">
                <motion.div className="wa-header-icon" variants={slideUpScroll}>
                  <svg viewBox="0 0 448 512" width="24" height="24" fill="#ffffff">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157z"/>
                  </svg>
                </motion.div>
                <div className="wa-header-meta">
                  <motion.h4 variants={slideUpScroll}>WhatsApp Support</motion.h4>
                  <motion.p variants={slideUpScroll}>Online • Ready to Assist</motion.p>
                </div>
              </div>
              
              <div className="wa-card-body">
                <motion.p className="wa-welcome-msg" variants={slideUpScroll}>
                  Need expert guidance for your visa application? Connect instantly with our advisors for quick and reliable assistance.
                </motion.p>
                <motion.a 
                  href="https://wa.me/7982295530" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="wa-action-btn"
                  variants={slideUpScroll}
                >
                  Start Chat Now
                </motion.a>
              </div>
            </motion.div>
          </motion.aside>

          {/* Right Column Content Area */}
          <section className="visa-details-body">
            <motion.div 
              className="workspace-preview-holder"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="mock-laptop-workspace">
                <motion.div className="passport-overlay-tag" variants={slideUpScroll}>PASSPORT</motion.div>
                <motion.div className="application-form-tag" variants={slideUpScroll}>VISA APPLICATION</motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="intro-text-block"
              variants={slideUpScroll}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <p>
                We guide you through every step of the visa application process, ensuring all your documents are accurate, complete, and ready for successful submission.
              </p>
            </motion.div>

            {/* Services Grid (Triggers individual stagers inside each card) */}
            <div className="services-three-column-grid">
              
              {/* Card 1 */}
              <motion.div 
                className="service-feature-card"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <motion.div className="feature-icon-circle" variants={slideUpScroll}>👥</motion.div>
                <motion.h4 variants={slideUpScroll}>Visa Documentation Guidance</motion.h4>
                <motion.p variants={slideUpScroll}>
                  Visa documentation requirements vary by country. Our experts ensure you have the correct and complete set of documents tailored to your study destination.
                </motion.p>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                className="service-feature-card"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <motion.div className="feature-icon-circle" variants={slideUpScroll}>💬</motion.div>
                <motion.h4 variants={slideUpScroll}>Financial Planning & Proof of Funds</motion.h4>
                <motion.p variants={slideUpScroll}>
                  We help you understand financial requirements and prepare the necessary proof of funds based on the specific guidelines of your chosen country.
                </motion.p>
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                className="service-feature-card"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <motion.div className="feature-icon-circle" variants={slideUpScroll}>📜</motion.div>
                <motion.h4 variants={slideUpScroll}>Medical & Background Requirements</motion.h4>
                <motion.p variants={slideUpScroll}>
                  Certain countries require medical examinations and police clearance certificates. We guide you through these requirements to ensure compliance.
                </motion.p>
              </motion.div>

            </div>
          </section>

        </div>
      </main>

      {/* Footer Block */}
      <motion.footer 
        className="visa-footer-bar"
        variants={slideUpScroll}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <p>
          As our student, you will always stay informed about the latest visa rules, requirements, and updates for a smooth application process.
        </p>
      </motion.footer>

      {/* Floating WhatsApp (Kept static for layout layout/trigger standard design) */}
      <div className="floating-action-widgets">
        <a 
          href="https://wa.me/7982295530" 
          className="whatsapp-bubble-widget" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 448 512" width="26" height="26" fill="currentColor">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9z"/>
          </svg>
        </a>
      </div>

    </div>
    <Footer />
    </>
  );
};

export default VisaAssistance;