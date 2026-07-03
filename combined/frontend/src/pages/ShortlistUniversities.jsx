import React from 'react';
import './ShortlistUniversities.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from 'framer-motion';

const ShortlistUniversities = () => {
  const whatsappFormLink = "https://wa.me/917982295530?text=Hi,%20I%20want%20to%20shortlist%20universities%20based%20on%20my%20profile.";

  // Scroll animation settings
  const scrollSettings = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, ease: "easeOut" }
  };

  return (
    <>
      <Navbar />
      <div className="visa-page-container">
        
        {/* Banner Section */}
        <header className="Shortlist-visa-hero-banner">
          <div className="hero-content-left">
            <h2></h2>
            <div className="breadcrumb-trail">
              <span className="home-icon"></span><span className="current-page"></span>
            </div>
          </div>
        </header>

        <main className="visa-main-content">
          <div className="visa-grid-container">
            
            {/* Sidebar */}
            <motion.aside className="visa-sidebar" {...scrollSettings}>
              <div className="appointment-call-widget-banner">
                <div className="widget-banner-image-placeholder">
                  <div className="purple-call-overlay">
                    <p>Book an Appointment with Our Experts</p>
                    <a href="tel:+911140515555" className="phone-number-banner">+91-7982295530</a>
                  </div>
                </div>
              </div>

              <div className="whatsapp-chat-card-panel">
                <div className="wa-panel-header">
                  <h4>APPOINTMENT FORM</h4>
                  <div className="purple-underline-decor"></div>
                </div>
                <div className="wa-panel-body">
                  <p className="wa-panel-text">Skip lengthy forms. Share your academic profile and preferences instantly with our team.</p>
                  <a href={whatsappFormLink} target="_blank" rel="noopener noreferrer" className="whatsapp-form-tag-btn-primary">Fill WhatsApp Form</a>
                </div>
              </div>
            </motion.aside>

            {/* Main Content Area */}
            <section className="visa-details-body">
              
              <motion.div className="shortlist-intro-header" {...scrollSettings}>
                <h3>University Shortlisting</h3>
                <p>At VIET Worldgate Private Limited, we help students identify the most suitable universities based on their academic profile, career goals, and financial background. Our expert advisors evaluate key factors such as university rankings, course structure, location, tuition fees, and future career opportunities to ensure you make the right decision for your global education journey.</p>
              </motion.div>

              <motion.div className="services-three-column-grid" {...scrollSettings}>
                <div className="service-feature-card-premium">
                  <div className="purple-icon-circle-badge"></div>
                  <h4>Country & Destination Selection</h4>
                  <p>We guide you in choosing the right study destination such as the UK, Canada, Australia, USA, and more based on your academic goals, budget, and long-term career opportunities.</p>
                </div>
                <div className="service-feature-card-premium">
                  <div className="purple-icon-circle-badge"></div>
                  <h4>University Selection</h4>
                  <p>We provide carefully shortlisted university options that align with your academic profile, increasing your chances of admission and future success.</p>
                </div>
                <div className="service-feature-card-premium">
                  <div className="purple-icon-circle-badge"></div>
                  <h4>Application Strategy</h4>
                  <p>Our team builds a strong application strategy by reviewing your documents and academic profile to maximize your chances of securing admission.</p>
                </div>
              </motion.div>

              <motion.div className="admission-checklist-block" {...scrollSettings}>
                <h3>Our University Shortlisting Process</h3>
                <p className="checklist-lead-text">Choosing the right university is a critical step in your study abroad journey. Our structured and personalized approach ensures you receive accurate and reliable guidance.</p>
                <ul className="custom-checkmark-list">
                  <li><span className="blue-check-icon">✓</span> Our counselors assess your academic background, interests, and career goals.</li>
                  <li><span className="blue-check-icon">✓</span> We shortlist universities that match your profile and budget.</li>
                  <li><span className="blue-check-icon">✓</span> Provide detailed comparison of universities, courses, and locations.</li>
                  <li><span className="blue-check-icon">✓</span> Assist in preparing SOP, LOR, and required documents.</li>
                  <li><span className="blue-check-icon">✓</span> Continuous support throughout the entire application process.</li>
                </ul>
              </motion.div>

              <motion.div className="university-partners-panel" {...scrollSettings}>
                <h3>Our Global Network</h3>
                <div className="partners-logo-grid">
                  <div className="logo-card"><div className="mock-logo-title bold-navy">UNITED KINGDOM</div></div>
                  <div className="logo-card"><div className="mock-logo-title orange-text">CANADA</div></div>
                  <div className="logo-card"><div className="mock-logo-title teal-text">AUSTRALIA</div></div>
                  <div className="logo-card"><div className="mock-logo-title black-bg-white-text">UNITED STATES</div></div>
                  <div className="logo-card"><div className="mock-logo-title modern-deakin">EUROPE</div></div>
                  <div className="logo-card"><div className="mock-logo-title block-ecu">NEW ZEALAND</div></div>
                </div>
              </motion.div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ShortlistUniversities;