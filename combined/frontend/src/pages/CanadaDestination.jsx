import React from 'react';
import './CanadaDestination.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: delay }}
    viewport={{ once: true, amount: 0.15 }}
  >
    {children}
  </motion.div>
);

export default function CanadaDestination() {
  const whatsappFormLink = "https://wa.me/917982295530?text=Hi,%20I%20am%20interested%20in%20studying%20in%20Canada.%20Please%20help%20me%20with%20course%20options,%20universities,%20colleges,%20and%20the%20study%20permit%20process.";

  return (
    <>
      <Navbar />
      <div className="destination-page-container">

        {/* HERO */}
        <motion.header
          className="destination-hero-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-overlay-flex">
            <motion.div
              className="hero-text-content"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <nav className="breadcrumb-nav">
                <span className="breadcrumb-arrow"></span>
                <span className="breadcrumb-arrow"></span>
              </nav>
            </motion.div>
            <div className="hero-badge-container">
              <div className="flag-badge-wrapper">
                <div className="canada-round-flag-badge">
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="#FF0000">
                    <path d="M12 .43l2.21 4.54 4.95.14-3.87 3.12 1.3 4.77L12 10.32l-4.59 2.68 1.3-4.77-3.87-3.12 4.95-.14zm-1 14.57h2v9h-2z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* MAIN GRID */}
        <div className="destination-main-layout-grid">

          {/* SIDEBAR */}
          <motion.aside
            className="destination-sidebar-area"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="sidebar-call-box">
              <p>Our Appointment Service call us</p>
              <a href="tel:+917982295530" className="sidebar-phone-link">
                <span className="phone-svg-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </span>
                +91-7982295530
              </a>
            </div>

            <div className="sidebar-whatsapp-card">
              <div className="whatsapp-card-header">
                <div className="whatsapp-header-svg">
                  <svg viewBox="0 0 448 512" width="24" height="24" fill="#ffffff">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157z"/>
                  </svg>
                </div>
                <div className="whatsapp-header-text">
                  <h4>Academic Support</h4>
                  <p>Online • Advisors Ready</p>
                </div>
              </div>
              <div className="whatsapp-card-body">
                <p className="whatsapp-welcome-message">
                  Confused about DLIs, SDS applications, requirements, or courses in Canada? Connect instantly with our experts for immediate support.
                </p>
                <a href={whatsappFormLink} target="_blank" rel="noopener noreferrer" className="whatsapp-chat-now-btn">
                  Start Chat Now
                </a>
              </div>
            </div>
          </motion.aside>

          {/* MAIN CONTENT */}
          <main className="destination-content-container">

            <FadeUp>
              <section className="content-info-block">
                <h2>Study in Canada: Your Pathway to Global Success!</h2>
                <p>
                  Canada is globally recognized for its high-quality education system, offering an array of programs across top-tier universities and colleges. With a strong focus on research, practical learning, and co-op programs, Canada equips students with real-world industry experience. Along with affordable tuition fees compared to other major study destinations, students benefit from a high standard of living, excellent healthcare, and diverse post-graduation work opportunities.
                </p>
              </section>
            </FadeUp>

            <FadeUp delay={0.1}>
              <section className="content-info-block">
                <h2>Why study in Canada?</h2>
                <p>
                  As an international student, Canada provides an exceptionally welcoming, safe, and multicultural environment. Educational institutions here hold dynamic campus cultures and robust support networks. Moreover, Canada's Post-Graduation Work Permit (PGWP) program offers a direct avenue to gain invaluable international work experience, making it one of the most attractive destinations for students worldwide to build long-term careers.
                </p>
              </section>
            </FadeUp>

            {/* FEATURE CARDS */}
            <section className="highlights-features-grid">
              {[
                {
                  title: "Student-Friendly Cities",
                  desc: "Top Canadian cities like Montreal, Toronto, and Vancouver consistently rank among the best student cities globally, offering vibrant cultures and safe environments.",
                  delay: 0,
                  double: true,
                },
                {
                  title: "World-Class Institutions",
                  desc: "Canada boasts numerous universities ranking in the global top 100, providing top-notch degrees, advanced research spaces, and exceptional co-op facilities.",
                  delay: 0.15,
                  double: false,
                },
                {
                  title: "Post-Study Work Options",
                  desc: "The Post-Graduation Work Permit (PGWP) allows eligible international graduates to stay and work in Canada, gaining crucial global industry experience.",
                  delay: 0.3,
                  double: false,
                },
              ].map(function(card, i) {
                return (
                  <motion.div
                    key={i}
                    className="highlight-feature-card"
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: card.delay }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <div className="feature-card-icons-row">
                      <div className={"feature-icon-circle" + (!card.double ? " badge-spacing-bottom" : "")}>
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                        </svg>
                      </div>
                      {card.double && (
                        <div className="feature-icon-circle">
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </motion.div>
                );
              })}
            </section>

            {/* FOOTER CTA */}
            <FadeUp delay={0.1}>
              <section className="explorer-footer-cta-section">
                <span className="cta-sub-tagline">UNLOCK YOUR FUTURE IN CANADA</span>
                <h2>Explore Universities, Colleges, and Scholarships in Canada</h2>
                <p className="cta-lead-heading-text">Discover the endless opportunities that await you in the Great White North.</p>
                <p className="cta-sub-supporting-text">Canada offers a world-class education alongside a diverse, inclusive, and breathtaking community experience. Are you ready to take your first step toward your academic journey?</p>
                <div className="cta-action-buttons-group">
                  <a href={whatsappFormLink} target="_blank" rel="noopener noreferrer" className="cta-button cta-green-btn">
                    EXPLORE UNIVERSITIES
                  </a>
                  <a href={whatsappFormLink} target="_blank" rel="noopener noreferrer" className="cta-button cta-green-btn">
                    FIND SCHOLARSHIPS
                  </a>
                </div>
              </section>
            </FadeUp>

          </main>
        </div>

        {/* FLOATING WHATSAPP */}
        <div className="floating-sticky-widgets-container">
          <a href={whatsappFormLink} className="floating-whatsapp-bubble" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
            <svg viewBox="0 0 448 512" width="26" height="26" fill="currentColor">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157z"/>
            </svg>
          </a>
        </div>

      </div>
      <Footer />
    </>
  );
}