import React from 'react';
import './Seminar.css'; 

// External layout components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { motion } from 'framer-motion';

import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Award, 
  GraduationCap, 
  Compass, 
  ShieldCheck 
} from 'lucide-react';

// ==========================================
// ANIMATION VARIANTS CONFIGURATION
// ==========================================

// Main container staggering orchestrator
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

// Layout items (cards, blocks, standard text lines)
const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

// Sidebar sliding entrance framework
const sidebarVariants = {
  hidden: { opacity: 0, x: 35 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut", delay: 0.15 } 
  }
};

// Word-by-word reveal for the main hero heading
const titleContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const titleWordVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// ==========================================
// REUSABLE SCROLL ANIMATED TEXT COMPONENT
// ==========================================
const ScrollAnimatedText = ({ children, className = "", variant = itemVariants }) => {
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variant}
    >
      {children}
    </motion.p>
  );
};

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
const EventPage = () => {
  const mainTitleText = "Global Study Abroad & Visa Consultation 2026";

  return (
    <div className="event-wrapper">
      
      {/* --- EXTERNAL NAVBAR COMPONENT --- */}
      <Navbar />

      <div className="event-container">
        
        {/* --- BANNER SECTION --- */}
        <div className="event-banner">
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <motion.span 
              className="badge-seminar"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              Free Mega Seminar
            </motion.span>
            
            {/* Word-by-Word Premium Reveal Title */}
            <motion.h1 
              className="banner-title"
              variants={titleContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {mainTitleText.split(" ").map((word, index) => (
                <motion.span 
                  key={index} 
                  variants={titleWordVariants}
                  style={{ display: 'inline-block', marginRight: '8px' }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Paragraph Fade/Slide Animation */}
            <ScrollAnimatedText className="banner-description">
              Unlock your international future! Meet top university representatives and visa experts. 
              Get direct guidance on scholarships, courses, and post-study work visas for the USA, 
              UK, Canada, Australia, and Europe.
            </ScrollAnimatedText>
            
            <motion.div 
              className="banner-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="meta-item">
                <Calendar size={16} className="meta-icon" />
                <span>28 June 2026</span>
              </div>
              <div className="meta-item">
                <Clock size={16} className="meta-icon" />
                <span>10:30 AM - 04:30 PM</span>
              </div>
              <div className="meta-item">
                <MapPin size={16} className="meta-icon" />
                <span>36, Block H, Sector 63, Uttar Pradesh 201301, Noida Delhi, India</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- MAIN LAYOUT GRID --- */}
        <div className="main-layout">
          
          {/* LEFT SECTION: About & Experts */}
          <div className="left-section">
            
            <div className="about-block">
              {/* Heading Scroll Animation */}
              <motion.h2 
                className="section-title"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={itemVariants}
              >
                About the Consultation Seminar
              </motion.h2>

              {/* Body Text Scroll Animation */}
              <ScrollAnimatedText className="section-desc">
                Confused about university applications, course selections, or visa processing? 
                This mega seminar is designed to provide students and parents with end-to-end 
                transparency regarding overseas education. Get 1-on-1 personalized profile 
                evaluations completely free of cost and discover financial aids that match 
                your academic performance.
              </ScrollAnimatedText>
            </div>

            {/* Features Row: Staggered entrance for all feature cards */}
            <motion.div 
              className="features-row"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={containerVariants}
            >
              <motion.div className="feature-card" variants={itemVariants}>
                <div className="feature-icon-wrapper icon-blue">
                  <GraduationCap size={20} />
                </div>
                <div className="feature-info-text">
                  <span className="feature-name">Profile Assessment</span>
                  <span className="feature-detail">Instant eligibility checks for top 500+ global universities.</span>
                </div>
              </motion.div>

              <motion.div className="feature-card" variants={itemVariants}>
                <div className="feature-icon-wrapper icon-purple">
                  <Compass size={20} />
                </div>
                <div className="feature-info-text">
                  <span className="feature-name">Scholarship Schemes</span>
                  <span className="feature-detail">Identify up to 100% tuition fee waiver opportunities.</span>
                </div>
              </motion.div>

              <motion.div className="feature-card" variants={itemVariants}>
                <div className="feature-icon-wrapper icon-green">
                  <ShieldCheck size={20} />
                </div>
                <div className="feature-info-text">
                  <span className="feature-name">Visa Guidance</span>
                  <span className="feature-detail">Step-by-step guidance on complex visa documentation.</span>
                </div>
              </motion.div>

              <motion.div className="feature-card" variants={itemVariants}>
                <div className="feature-icon-wrapper icon-orange">
                  <Award size={20} />
                </div>
                <div className="feature-info-text">
                  <span className="feature-name">IELTS / TOEFL Tips</span>
                  <span className="feature-detail">Get special diagnostic kits and learning material strategy.</span>
                </div>
              </motion.div>
            </motion.div>

          </div>

          {/* RIGHT SECTION: Event Details Side Panel */}
          <motion.div 
            className="right-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sidebarVariants}
          >
            <div className="details-card">
              <h3 className="sidebar-title">Session Details</h3>
              
              <div className="sidebar-info-list">
                <div className="sidebar-item">
                  <Calendar size={18} className="sidebar-icon" />
                  <div>
                    <label>Date</label>
                    <p>28 June 2026</p>
                  </div>
                </div>

                <div className="sidebar-item">
                  <Clock size={18} className="sidebar-icon" />
                  <div>
                    <label>Timings</label>
                    <p>10:30 AM - 04:30 PM</p>
                  </div>
                </div>

                <div className="sidebar-item">
                  <MapPin size={18} className="sidebar-icon" />
                  <div>
                    <label>Venue Location</label>
                    <p>36, Block H, Sector 63, Uttar Pradesh 201301, Noida Delhi, India</p>
                  </div>
                </div>

                <div className="sidebar-item">
                  <Users size={18} className="sidebar-icon" />
                  <div>
                    <label>Free Slots Remaining</label>
                    <p className="seats-highlight">Only 45 Left</p>
                  </div>
                </div>
              </div>

              <hr className="divider" />

              <div className="registration-block">
                <label>Entry Fee</label>
                <h2 className="price">100% Free <span className="tax-text">(Prior Registration Mandatory)</span></h2>
              </div>

              <div className="action-buttons">
                {/* Micro-interaction tap mechanics on registration CTA */}
                <motion.button 
                  className="btn-register"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 14 }}
                >
                  Book Free Slots Now
                </motion.button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* --- EXTERNAL FOOTER COMPONENT --- */}
      <Footer />

    </div>
  );
};

export default EventPage;