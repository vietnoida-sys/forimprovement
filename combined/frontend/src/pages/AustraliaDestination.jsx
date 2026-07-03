import React from 'react';
import './AustraliaDestination.css';
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
      <div className="intl-dest-wrapper">

        {/* HERO BANNER */}
        <motion.header
          className="intl-hero-banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="intl-banner-overlay">
            <motion.div
              className="intl-banner-text"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h1></h1>
              <nav className="intl-breadcrumb">
                <span className="intl-crumb-home"></span>
                <span className="intl-crumb-arrow"></span>
                <span className="intl-crumb-arrow"></span>
              </nav>
            </motion.div>
            <div className="intl-badge-holder"></div>
          </div>
        </motion.header>

        {/* MAIN GRID */}
        <div className="intl-main-grid">

          {/* LEFT SIDEBAR */}
          <motion.aside
            className="intl-sidebar-pane"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="intl-call-box">
              <p>Our Appointment Service call us</p>
              <a href="tel:+917982295530" className="intl-phone-link">
                <span className="intl-phone-icon">📞</span> +91-7982295530
              </a>
            </div>

            <div className="intl-whatsapp-card">
              <div className="intl-wa-header">
                <div className="intl-wa-icon">
                  <svg viewBox="0 0 448 512" width="24" height="24" fill="#ffffff">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157z"/>
                  </svg>
                </div>
                <div className="intl-wa-meta">
                  <h4>Academic Support</h4>
                  <p>Online • Advisors Ready</p>
                </div>
              </div>
              <div className="intl-wa-body">
                <p className="intl-wa-msg">
                  Confused about DLIs, SDS applications, requirements, or courses in Australia? Connect instantly with our experts for immediate support.
                </p>
                <a
                  href={whatsappFormLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="intl-wa-btn"
                >
                  Start Chat Now
                </a>
              </div>
            </div>
          </motion.aside>

          {/* RIGHT CONTENT */}
          <main className="intl-content-pane">

            <FadeUp>
              <section className="intl-info-section">
                <h2>Study in Australia: Your Pathway to Global Success!</h2>
                <p>
                  Australia is globally recognized for its high-quality education system, offering an array of programs across top-tier universities and colleges. With a strong focus on research, practical learning, and co-op programs, Australia equips students with real-world industry experience. Along with affordable tuition fees compared to other major study destinations, students benefit from a high standard of living, excellent healthcare, and diverse post-graduation work opportunities.
                </p>
              </section>
            </FadeUp>

            <FadeUp delay={0.1}>
              <section className="intl-info-section">
                <h2>Why study in Australia?</h2>
                <p>
                  As an international student, Australia provides an exceptionally welcoming, safe, and multicultural environment. Educational institutions here hold dynamic campus cultures and robust support networks. Moreover, Australia's Post-Graduation Work Permit (PGWP) program offers a direct avenue to gain invaluable international work experience, making it one of the most attractive destinations for students worldwide to build long-term careers.
                </p>
              </section>
            </FadeUp>

            {/* FEATURE CARDS */}
            <section className="intl-features-container">
              {[
                {
                  icons: ["🍁", "👥"],
                  double: true,
                  title: "Student-Friendly Cities",
                  desc: "Top Australian cities like Sydney, Melbourne, and Brisbane consistently rank among the best student cities globally, offering vibrant cultures and safe environments.",
                },
                {
                  icons: ["🎓"],
                  title: "World-Class Institutions",
                  desc: "Australia boasts numerous universities ranking in the global top 100, providing top-notch degrees, advanced research spaces, and exceptional co-op facilities.",
                },
                {
                  icons: ["💼"],
                  title: "Post-Study Work Options",
                  desc: "The Post-Graduation Work Permit (PGWP) allows eligible international graduates to stay and work in Australia, gaining crucial global industry experience.",
                },
              ].map(function(card, i) {
                return (
                  <motion.div
                    key={i}
                    className="intl-feature-item"
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: i * 0.15 }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <div className={"intl-icon-wrapper" + (card.double ? " intl-double-icon" : "")}>
                      {card.icons.map(function(icon, j) {
                        return <div key={j} className="intl-icon-circle">{icon}</div>;
                      })}
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </motion.div>
                );
              })}
            </section>

            {/* FOOTER CTA */}
            <FadeUp delay={0.1}>
              <section className="intl-footer-cta">
                <span className="intl-cta-tagline">UNLOCK YOUR FUTURE IN AUSTRALIA</span>
                <h2>Explore Universities, Colleges, and Scholarships in Australia</h2>
                <p className="intl-cta-lead">Discover the endless opportunities that await you in the Land Down Under.</p>
                <p className="intl-cta-sub">Australia offers a world-class education alongside a diverse, inclusive, and breathtaking community experience. Are you ready to take your first step toward your academic journey?</p>
                <div className="intl-btn-group">
                  <a href={whatsappFormLink} target="_blank" rel="noopener noreferrer" className="intl-primary-btn">
                    EXPLORE UNIVERSITIES
                  </a>
                  <a href={whatsappFormLink} target="_blank" rel="noopener noreferrer" className="intl-primary-btn">
                    FIND SCHOLARSHIPS
                  </a>
                </div>
              </section>
            </FadeUp>

          </main>
        </div>

        {/* FLOATING WHATSAPP */}
        <div className="intl-floating-widgets">
          <a
            href={whatsappFormLink}
            className="intl-whatsapp-bubble"
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
}