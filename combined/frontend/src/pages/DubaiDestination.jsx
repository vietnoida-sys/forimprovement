import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Imported Framer Motion
import './DubaiDestination.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function DubaiDestination() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const whatsappLink = "https://wa.me/917982295530?text=Hi,%20I'm%20interested%20in%20studying%20in%20Dubai.%20Please%20help%20me%20with%20courses%20and%20university%20options.";

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Animation configuration configurations
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2 // Staggers the entry of children feature cards
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="dxb-page-wrapper">

        {/* HERO BANNER */}
        <header className="dxb-hero-banner">
          <div className="dxb-hero-inner">
            <div className="dxb-hero-right">
              <span className="dxb-flag-emoji"></span>
            </div>
          </div>
        </header>

        {/* MAIN GRID */}
        <div className="dxb-main-grid">

          {/* SIDEBAR */}
          <aside className="dxb-sidebar">
            <div className="dxb-call-card">
              <span className="dxb-call-label">Our Appointment Service call us</span>
              <a href="tel:+917982295530" className="dxb-phone-link">
                <span>📞</span> +91-7982295530
              </a>
            </div>

            <div className="dxb-wa-card">
              <div className="dxb-wa-header">
                <div className="dxb-wa-icon">
                  <svg viewBox="0 0 448 512" width="24" height="24" fill="#ffffff">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157z"/>
                  </svg>
                </div>
                <div className="dxb-wa-meta">
                  <h4>Academic Support</h4>
                  <p>Online • Advisors Ready</p>
                </div>
              </div>
              <div className="dxb-wa-body">
                <p>Connect with our expert Dubai advisors for personalized guidance on international branch campuses, English-taught courses, visa systems, and job scopes.</p>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="dxb-wa-btn">
                  START CHAT NOW
                </a>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="dxb-content">

            {/* INFO BLOCK 1 */}
            <motion.section 
              className="dxb-info-block"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2>Study in Dubai: It's easier than you think!</h2>
              <p>
                Dubai offers a rapidly growing educational hub with top international branch campuses from the UK, Australia,
                and the US. Its world-class infrastructure, high quality of life, and strategic geographical location make it an
                incredibly attractive destination for students looking for global corporate exposure.
              </p>
            </motion.section>

            {/* INFO BLOCK 2 */}
            <motion.section 
              className="dxb-info-block"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2>Why study in Dubai?</h2>
              <p>
                Dubai has successfully transformed into a leading multi-cultural hub offering globally recognized degree options
                bypassing complicated visa regulations. With flexible part-time internship setups across vast multi-national corridors,
                it provides modern training, extensive safety, and highly dynamic career options after graduation.
              </p>
            </motion.section>

            {/* FEATURE CARDS (STAGGERED ANIMATION) */}
            <motion.section 
              className="dxb-features-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div className="dxb-feature-card" variants={fadeInUp}>
                <div className="dxb-icon-circle">
                  <span>👥</span>
                </div>
                <h3>Student-Friendly</h3>
                <p>Dubai scores exceptionally high on global safety standards, presenting an active, safe and deeply welcoming multicultural lifestyle for international students.</p>
              </motion.div>

              <motion.div className="dxb-feature-card" variants={fadeInUp}>
                <div className="dxb-icon-circle">
                  <span>🎓</span>
                </div>
                <h3>World-Class Degrees</h3>
                <p>Home to elite global universities offering verified fast-track degree validation paths identical to their western home campuses.</p>
              </motion.div>

              <motion.div className="dxb-feature-card" variants={fadeInUp}>
                <div className="dxb-icon-circle">
                  <span>🌍</span>
                </div>
                <h3>Diversity Inclusive</h3>
                <p>Embraces cosmopolitan diversity across nationalities, unlocking continuous industry connectivity for global applicants.</p>
              </motion.div>
            </motion.section>

            {/* CTA SECTION (SCALE & FADE UP EFFECT) */}
            <motion.section 
              className="dxb-cta-section"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="dxb-cta-tagline">UNLOCK YOUR FUTURE IN DUBAI</span>
              <h2 className="dxb-cta-heading">Explore Universities and Scholarships in Dubai</h2>
              <p className="dxb-cta-lead">Discover the endless opportunities that await you in the Middle East's Hub.</p>
              <p className="dxb-cta-sub">
                Dubai offers high-end international training paired with direct corporate networking. Are you ready to take the first step towards your academic journey in Dubai?
              </p>
              <div className="dxb-btn-row">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="dxb-primary-btn">
                  EXPLORE UNIVERSITIES
                </a>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="dxb-primary-btn">
                  FIND SCHOLARSHIPS
                </a>
              </div>
            </motion.section>

          </main>
        </div>

        {/* SCROLL TO TOP FLOATING BUTTON */}
        {showScrollTop && (
          <motion.button 
            className="dxb-scroll-top" 
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ⬆️
          </motion.button>
        )}

      </div>
      <Footer />
    </>
  );
}