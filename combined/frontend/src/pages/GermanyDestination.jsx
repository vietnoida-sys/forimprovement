import React from 'react';
import './GermanyDestination.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { FaPhoneAlt } from "react-icons/fa";
import { motion } from 'framer-motion'; // Framer motion imported

export default function GermanyDestination() {
  const whatsappLink = "https://wa.me/917982295530?text=Hi,%20I%20am%20interested%20in%20studying%20in%20Germany.%20Please%20guide%20me%20about%20public%20universities%20and%20the%20visa%20process.";

  // --- PREMIUM ANIMATION CONFIGURATIONS (VARIANTS) ---
  
  // Container ke andar ke elements ko ek-ke-baad-ek chalane ke liye
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // elements ke beech ka delay kaafi smooth chalega
      }
    }
  };

  // Text aur blocks ka up-slide effect
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1] } 
    }
  };

  // Sidebar cards ke liye right-to-left ya fade-in-up transition
  const sidebarFadeIn = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  // Grid ke individual features card ke liye thoda springy aur energetic bounce bounce up
  const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 70, damping: 14 } 
    }
  };

  return (
    <>
      <Navbar />
      <div className="deu-page-wrapper">

        {/* HERO BANNER - Soft Zoom and Fade In */}
        <motion.header 
          className="deu-hero-banner"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="deu-hero-inner">
            <motion.div 
              className="deu-hero-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="deu-hero-title">Germany Destination</h1>
              <nav className="deu-breadcrumb">
                <span>Home</span>
                <span className="deu-arrow">&gt;</span>
                <span>Destinations</span>
                <span className="deu-arrow">&gt;</span>
                <span>Germany</span> 
              </nav>
            </motion.div>
            <motion.div 
              className="deu-hero-right"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            >
              <span className="deu-flag-emoji">🇩🇪</span>
            </motion.div>
          </div>
        </motion.header>

        {/* MAIN GRID */}
        <div className="deu-main-grid">

          {/* SIDEBAR - Sequential slide-up */}
          <motion.aside 
            className="deu-sidebar"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div className="deu-call-card" variants={sidebarFadeIn}>
              <p>Our Appointment Service call us</p>
              <a href="tel:+917982295530" className="deu-phone-link">
                <div className='contact-item'>
                  <FaPhoneAlt className="contact-icon"/>
                  <span>+91 7982295530</span>
                </div>
              </a>
            </motion.div>

            <motion.div className="deu-wa-card" variants={sidebarFadeIn}>
              <div className="deu-wa-header">
                <h3>Academic Support</h3>
                <div className="deu-wa-status">
                  <span className="deu-pulse-dot"></span> Online Now
                </div>
              </div>
              <div className="deu-wa-body">
                <p className="deu-wa-intro">
                  Confused about standard applications, requirements, public university pathways, or blocked accounts in Germany?
                </p>
                <div className="deu-wa-highlight">
                  Our dynamic educational counselors are ready to help you with the admission process instantly.
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="deu-wa-btn"
                >
                  <span>💬</span> START CHAT NOW
                </a>
              </div>
            </motion.div>
          </motion.aside>

          {/* MAIN CONTENT */}
          <main className="deu-content">

            {/* Block 1 */}
            <motion.section 
              className="deu-info-block"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2>Study in Germany: A World-Class Choice</h2>
              <div className="deu-divider"></div>
              <p>
                Germany is a leading global destination for international students, offering high-quality education,
                tuition-free public universities, and a strong international reputation, especially in fields like
                engineering, computer science, and business.
              </p>
            </motion.section>

            {/* Block 2 (Why Germany Section) */}
            <motion.section 
              className="deu-info-block"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 variants={fadeInUp}>Why study in Germany?</motion.h2>
              <motion.div className="deu-divider" variants={fadeInUp}></motion.div>

              <motion.div className="deu-nested-block" variants={fadeInUp}>
                <h3>Strong Focus on Research & Innovation</h3>
                <ul className="deu-bullet-list">
                  <li>Germany invests heavily in research and development (R&D), providing students with cutting-edge facilities.</li>
                  <li>Students often get chances to work on real-world projects with leading companies and research institutes.</li>
                  <li>Ideal for those pursuing careers in STEM, medicine, business, or social sciences.</li>
                </ul>
              </motion.div>

              <motion.div className="deu-nested-block" variants={fadeInUp}>
                <h3>Excellent Career Opportunities</h3>
                <ul className="deu-bullet-list">
                  <li>Germany has Europe's largest economy, offering numerous job opportunities for international graduates.</li>
                  <li>International graduates can stay for up to 18 months after finishing their studies to find a relevant job.</li>
                  <li>Skilled workers in IT, engineering, healthcare, and business are in high demand across the country.</li>
                </ul>
              </motion.div>
            </motion.section>

            {/* FEATURE CARDS - Ek ke baad ek cards smooth aayenge (Staggered) */}
            <motion.section 
              className="deu-features-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // 30% screen par aate hi run hoga
            >
              <motion.div className="deu-feature-card" variants={cardVariant}>
                <div className="deu-icon-circle"><span>🎓</span></div>
                <h3>Affordable Education</h3>
                <p>Public universities offer tuition-free education for both local and international students alike.</p>
              </motion.div>

              <motion.div className="deu-feature-card" variants={cardVariant}>
                <div className="deu-icon-circle"><span>💼</span></div>
                <h3>Career Prospects</h3>
                <p>Strong ties with industries like BMW, Siemens, and SAP ensure excellent job placement horizons.</p>
              </motion.div>

              <motion.div className="deu-feature-card" variants={cardVariant}>
                <div className="deu-icon-circle"><span>📜</span></div>
                <h3>Scholarships</h3>
                <p>DAAD and other organizations provide a wide variety of financial support to meritorious students.</p>
              </motion.div>
            </motion.section>

            {/* Block 3 */}
            <motion.section 
              className="deu-info-block"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2>Strong Industry-University Links</h2>
              <div className="deu-divider"></div>
              <p>
                Many German universities collaborate closely with top global companies (e.g., <strong>BMW, Siemens, Bosch, and SAP</strong>).
                This gives students hands-on experience and a significant head start in their professional careers.
              </p>
            </motion.section>

            {/* CTA SECTION - Rich Pop up with button scaling */}
            <motion.section 
              className="deu-cta-section"
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="deu-cta-tagline">UNLOCK YOUR FUTURE IN GERMANY</span>
              <h2 className="deu-cta-heading">Explore Universities and Scholarships in Germany</h2>
              <p className="deu-cta-lead">Discover the endless opportunities that await you in Germany.</p>
              <p className="deu-cta-sub">Germany offers world-class education and a vibrant, diverse cultural experience. Are you ready to take the first step towards your academic journey?</p>
              <div className="deu-btn-row">
                <motion.a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="deu-primary-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  EXPLORE UNIVERSITIES
                </motion.a>
                <motion.a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="deu-primary-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  FIND SCHOLARSHIPS
                </motion.a>
              </div>
            </motion.section>

          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}