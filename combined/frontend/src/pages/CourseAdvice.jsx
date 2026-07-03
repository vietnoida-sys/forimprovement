import React from 'react';
import { motion } from 'framer-motion';
import './CourseAdvice.css'; // Aap iska naam ya classes badal sakte hain, par abhi workflow same rakha hai
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Safe and proven individual scroll animation wrapper
const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.1 }}
  >
    {children}
  </motion.div>
);

const CourseAdvice = () => {
  // WhatsApp Link with a custom pre-filled message for Course Advice
  const whatsappFormLink = "https://wa.me/917982295530?text=Hi,%20I%20need%20Course%20Advice%20and%20Career%20Counseling.%20Please%20help%20me%20choose%20the%20right%20course%20and%20university.";

  return (
    <>
    <Navbar />
    <div className="visa-page-container">
      
      {/* Hero Banner Section - Instantly visible on load */}
      <motion.header 
        className="CourseAdvice-hero-banner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
          </div>
        </div>
      </motion.header>

      {/* Main Content Area */}
      <main className="visa-main-content">
        <div className="visa-grid-container">
          
          {/* Left Column (Sidebar) */}
          <aside className="visa-sidebar">
            
            {/* Call Widget */}
            <FadeUp delay={0.1}>
              <div className="appointment-call-widget">
                <div className="widget-flex">
                  <div className="headset-icon">🎧</div>
                  <div className="widget-text">
                    <p>Talk to Our Course Experts</p>
                    <a href="tel:+917982295530" className="phone-number">+91-7982295530</a>
                  </div>
                </div>
                <div className="white-arrow-decor">➔</div>
              </div>
            </FadeUp>

            {/* WhatsApp Chat Card */}
            <FadeUp delay={0.2}>
              <div className="whatsapp-chat-card">
                <div className="wa-card-header">
                  <div className="wa-header-icon">
                    <svg viewBox="0 0 448 512" width="24" height="24" fill="#ffffff">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157z"/>
                    </svg>
                  </div>
                  <div className="wa-header-meta">
                    <h4>Academic Support</h4>
                    <p>Online • Advisors Ready</p>
                  </div>
                </div>
                
                <div className="wa-card-body">
                  <p className="wa-welcome-msg">
                    Confused about which course or university to choose? Connect instantly with our expert counselors for personalized guidance.
                  </p>
                  <a 
                    href="https://wa.me/7982295530" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="wa-action-btn"
                  >
                    Start Chat Now
                  </a>
                </div>
              </div>
            </FadeUp>
          </aside>

          {/* Right Column (Main Details) */}
          <section className="visa-details-body">
            <FadeUp delay={0.1}>
              <div className="workspace-preview-holder">
                <div className="mock-laptop-workspace">
                  <div className="passport-overlay-tag">PROSPECTUS</div>
                  
                  {/* --- APPOINTMENT FORM KI JAGAH WHATSFORM --- */}
                  <a 
                    href={whatsappFormLink}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="whatsapp-form-tag-btn"
                  >
                    <span className="wa-form-icon">📝</span> FILL WHATSAPP FORM
                  </a>
                  {/* ------------------------------------------- */}

                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="intro-text-block">
                <p>
                  We help you navigate through thousands of course options and universities worldwide, aligning your academic background and budget with the perfect career path.
                </p>
              </div>
            </FadeUp>

            {/* Services/Features Grid */}
            <div className="services-three-column-grid">
              
              {/* Card 1 */}
              <FadeUp delay={0.1}>
                <div className="service-feature-card">
                  <div className="feature-icon-circle">🎓</div>
                  <h4>Personalized Course Selection</h4>
                  <p>
                    Get a curated list of courses and programs based on your interests, academic history, strengths, and long-term career goals.
                  </p>
                </div>
              </FadeUp>

              {/* Card 2 */}
              <FadeUp delay={0.2}>
                <div className="service-feature-card">
                  <div className="feature-icon-circle">🏛️</div>
                  <h4>University Shortlisting</h4>
                  <p>
                    We help you compare and choose the right global universities based on rankings, tuition fees, location, and campus placement records.
                  </p>
                </div>
              </FadeUp>

              {/* Card 3 */}
              <FadeUp delay={0.3}>
                <div className="service-feature-card">
                  <div className="feature-icon-circle">💼</div>
                  <h4>Career Pathway Mapping</h4>
                  <p>
                    Understand the job prospects, internship opportunities, and future market scope of your chosen field before making a final decision.
                  </p>
                </div>
              </FadeUp>

            </div>
          </section>

        </div>
      </main>

      {/* Footer text specific to students */}
      <FadeUp delay={0.1}>
        <footer className="visa-footer-bar">
          <p>
            Your future starts with the right choice. Our advisors ensure you receive the most updated information on eligibility criteria and intakes.
          </p>
        </footer>
      </FadeUp>

      {/* Floating WhatsApp Bubble */}
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

export default CourseAdvice;