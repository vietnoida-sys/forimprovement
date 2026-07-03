import React from 'react';
import './PreDeparture.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from 'framer-motion';

const PreDeparture = () => {
  const whatsappFormLink = "https://wa.me/+447500494401?text=Hi,%20I%20want%20to%20attend%20the%20pre-departure%20sessions.%20Please%20guide%20me%20with%20the%20process.";

  // ── ENTERPRISE MOTION CONFIGURATIONS ─────────────────────
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const viewportConfig = { once: true, amount: 0.15 };

  return (
    <>
      <Navbar />
      <div className="visa-page-container">
        
        {/* Hero Banner Section */}
        <header className="PreDeparture-visa-hero-banner">
          <div className="hero-content-left">
            <div className="breadcrumb-trail">
            </div>
          </div>
        </header>

        {/* Main Split Layout */}
        <main className="visa-main-content">
          <div className="visa-grid-container">
            
            {/* Sidebar Left Area */}
            <aside className="visa-sidebar">
              
              {/* Call Agent Expert Widget Banner */}
              <motion.div 
                className="appointment-call-widget-banner"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5 }}
              >
                <div className="widget-banner-image-placeholder">
                  <div className="purple-call-overlay">
                    <p>Speak with Our Study Abroad Experts</p>
                    <a href="tel: +91 7982295530" className="phone-number-banner">
                      <span className="phone-svg-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                      </span>
                      +91 7982295530
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* WhatsApp Panel */}
              <motion.div 
                className="whatsapp-chat-card-panel"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
              >
                <div className="wa-panel-header">
                  <motion.h4 variants={itemVariants}>QUICK CONNECT</motion.h4>
                  <div className="purple-underline-decor"></div>
                </div>
                
                <div className="wa-panel-body">
                  <motion.p className="wa-panel-text" variants={itemVariants}>
                    Get instant pre-departure guidance. Share your travel plans, destination, and requirements with our experts via WhatsApp for quick and personalized support.
                  </motion.p>
                  
                  {/* Normal anchor tag wrapped inside motion.div to lock original CSS styles */}
                  <motion.div variants={itemVariants}>
                    <a 
                      href={whatsappFormLink}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="whatsapp-form-tag-btn-primary"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                      Connect on WhatsApp
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </aside>

            {/* Right Section */}
            <section className="visa-details-body">
              
              <motion.div 
                className="shortlist-intro-header"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
              >
                <motion.h3 variants={itemVariants}>Pre-Departure Support</motion.h3>
                <motion.p variants={itemVariants}>
                  Preparing to study abroad is an exciting step, and we ensure you are fully ready before your journey begins. Our pre-departure assistance covers everything from travel arrangements and accommodation to financial planning and on-arrival support, helping you transition smoothly into your new academic environment.
                </motion.p>
              </motion.div>

              {/* Features Grid */}
              <motion.div 
                className="services-three-column-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
              >
                {/* Card 1 */}
                <motion.div className="service-feature-card-premium" variants={itemVariants}>
                  <div className="purple-icon-circle-badge">
                    <span style={{ fontSize: '22px', color: '#fff' }}>🧳</span>
                  </div>
                  <div>
                    <h4>Packing & Travel Guidance</h4>
                    <p>
                      Receive a complete checklist of essential items, documents, and travel tips to ensure a stress-free departure and smooth journey.
                    </p>
                  </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div className="service-feature-card-premium" variants={itemVariants}>
                  <div className="purple-icon-circle-badge">
                    <span style={{ fontSize: '22px', color: '#fff' }}>✈️</span>
                  </div>
                  <div>
                    <h4>Arrival & Settlement Support</h4>
                    <p>
                      Get detailed guidance on airport procedures, immigration, accommodation check-in, and settling into your new environment.
                    </p>
                  </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div className="service-feature-card-premium" variants={itemVariants}>
                  <div className="purple-icon-circle-badge">
                    <span style={{ fontSize: '22px', color: '#fff' }}>💳</span>
                  </div>
                  <div>
                    <h4>Banking & Financial Setup</h4>
                    <p>
                      Assistance with opening bank accounts, managing foreign exchange, and understanding financial systems in your destination country.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Checklist Section */}
              <motion.div 
                className="admission-checklist-block"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
              >
                <motion.h3 variants={itemVariants}>Life in Your Study Destination</motion.h3>
                <motion.p className="checklist-lead-text" variants={itemVariants}>
                  Our sessions prepare you beyond academics by helping you understand lifestyle, culture, and responsibilities as an international student.
                </motion.p>
                
                <ul className="custom-checkmark-list">
                  <motion.li className="feature-item-list" variants={itemVariants}>
                    <span className="blue-check-icon">✓</span> Understanding local culture, traditions, and lifestyle
                  </motion.li>
                  <motion.li className="feature-item-list" variants={itemVariants}>
                    <span className="blue-check-icon">✓</span> Adapting to university education systems and expectations
                  </motion.li>
                  <motion.li className="feature-item-list" variants={itemVariants}>
                    <span className="blue-check-icon">✓</span> Managing cultural transition and homesickness
                  </motion.li>
                  <motion.li className="feature-item-list" variants={itemVariants}>
                    <span className="blue-check-icon">✓</span> Working part-time while studying as per visa rules
                  </motion.li>
                  <motion.li className="feature-item-list" variants={itemVariants}>
                    <span className="blue-check-icon">✓</span> Awareness of legal rights and responsibilities
                  </motion.li>
                </ul>
              </motion.div>

              {/* Closing Banner Info */}
              <motion.div 
                className="university-partners-panel"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.6 }}
              >
                <p className="checklist-closing-text" style={{ fontStyle: 'normal', color: '#555' }}>
                  Our goal is to ensure you are confident, prepared, and fully equipped before starting your international education journey. With expert guidance and practical support, we help you transition smoothly and succeed from day one.
                </p>
              </motion.div>

            </section>

          </div>
        </main>

        {/* Floating WhatsApp */}
        <div className="floating-action-widgets">
          <a 
            href="https://wa.me/+447500494401" 
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

export default PreDeparture;