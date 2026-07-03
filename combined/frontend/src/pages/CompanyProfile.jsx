import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaHistory,
  FaEye,
  FaGem,
  FaThumbsUp,
  FaTrophy,
  FaUsers,
  FaBuilding,
  FaAward,
  FaGlobe,
  FaHeart,
  FaImages,
  FaBullseye,
  FaLightbulb,
  FaCogs,
  FaBriefcase,
  FaHeadphones,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "./CompanyProfile.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

export default function CompanyProfile() {

  const [activeTab, setActiveTab] = useState("Overview");

  const sidebarItems = [
    { name: "Overview", icon: <FaClipboardList />, link: "/about/overview" },
    { name: "Our History", icon: <FaHistory />, link: "/companyHistory" },
    { name: "Vision & Mission", icon: <FaEye />, link: "/MissionVision" },
    { name: "Our Values", icon: <FaGem />, link: "/ourteam" },
    { name: "Why Choose Us", icon: <FaThumbsUp />, link: "/Whychooseus" },
    { name: "Our Achievements", icon: <FaTrophy />, link: "/Certificate" },
    { name: "Our Team", icon: <FaUsers />, link: "/ourteam" },
    { name: "Our Infrastructure", icon: <FaBuilding />, link: "/Infrastructure" },
    { name: "Accreditations", icon: <FaAward />, link: "/Accrediations" },
    { name: "Our Presence", icon: <FaGlobe />, link: "/OurPresence" },
    { name: "Social Responsibility", icon: <FaHeart />, link: "/Socialresponsibility" },
    { name: "Gallery", icon: <FaImages />, link: "/gallary" },
  ];

  const stats = [
    { number: "6+", label: "Years of Excellence", icon: <FaTrophy /> },
    { number: "2600+", label: "Students Guided", icon: <FaUsers /> },
    { number: "200+", label: "Professional Courses", icon: <FaClipboardList /> },
    { number: "2", label: "Countries Tie-ups", icon: <FaGlobe /> },
  ];

  return (
    <>
      <Navbar />

      <div className="profile-container">

        {/* HERO BANNER */}
        <motion.header
          className="hero-banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-content"></div>

          <motion.div
            className="hero-image-container"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
              alt="Institute"
              loading="lazy"
              className="hero-building-img"
            />
          </motion.div>
        </motion.header>

        {/* MAIN LAYOUT */}
        <div className="main-layout">

          {/* SIDEBAR */}
          <motion.aside
            className="sidebar-nav"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ul>
              {sidebarItems.map(function(item, i) {
                return (
                  <motion.li
                    key={item.name}
                    className={activeTab === item.name ? "active" : ""}
                    onClick={() => setActiveTab(item.name)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                  >
                    <Link
                      to={item.link}
                      className="sidebar-link-anchor"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        width: "100%",
                      }}
                    >
                      <span className="menu-icon">{item.icon}</span>
                      <span className="menu-text">{item.name}</span>
                      {activeTab === item.name && (
                        <span className="arrow-indicator">&gt;</span>
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.aside>

          {/* CONTENT AREA */}
          <main className="content-area">

            {/* TOP SECTION */}
            <FadeUp>
              <div className="top-grid">

                <section className="overview-main-card">
                  <div className="card-header-icon"><FaClipboardList /></div>
                  <h2>Overview</h2>
                  <p>
                    Innovative Institute is a leading educational organization
                    committed to providing quality education and career guidance
                    to students.
                  </p>
                  <button className="know-more-btn">Know More →</button>
                </section>

                <div className="stats-grid">
                  {stats.map(function(stat, index) {
                    return (
                      <motion.div
                        key={index}
                        className="stat-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.12 }}
                        viewport={{ once: true, amount: 0.3 }}
                      >
                        <div className="stat-icon">{stat.icon}</div>
                        <h3>{stat.number}</h3>
                        <p>{stat.label}</p>
                      </motion.div>
                    );
                  })}
                </div>

              </div>
            </FadeUp>

            {/* MIDDLE SECTION */}
            <FadeUp delay={0.1}>
              <div className="middle-grid">

                <div className="mission-vision-wrapper">
                  <div className="inner-info-card">
                    <div className="info-icon green-bg"><FaBullseye /></div>
                    <div>
                      <h4>Our Mission</h4>
                      <p>To deliver world-class education and training that empowers students.</p>
                    </div>
                  </div>
                  <div className="inner-info-card">
                    <div className="info-icon green-bg"><FaEye /></div>
                    <div>
                      <h4>Our Vision</h4>
                      <p>To be a global leader in education and career development.</p>
                    </div>
                  </div>
                </div>

                <section className="values-card">
                  <div className="values-header">
                    <span className="value-icon-main"><FaGem /></span>
                    <h4>Our Values</h4>
                  </div>
                  <ul>
                    <li>✔️ Integrity & Transparency</li>
                    <li>✔️ Excellence in Education</li>
                    <li>✔️ Student-Centric Approach</li>
                    <li>✔️ Innovation & Growth</li>
                    <li>✔️ Respect & Collaboration</li>
                  </ul>
                </section>

                <blockquote className="quote-box">
                  <span className="quote-mark">"</span>
                  <p>
                    Our commitment is to build a brighter future for every
                    student through quality education and global opportunities.
                  </p>
                  <div className="quote-bg-icon"><FaBuilding /></div>
                </blockquote>

              </div>
            </FadeUp>

            {/* BOTTOM SECTION */}
            <FadeUp delay={0.1}>
              <div className="bottom-grid">

                <section className="offers-section">
                  <h3>What We Offer</h3>
                  <div className="offers-row">
                    {[
                      { icon: <FaLightbulb />, title: "Career Guidance", desc: "Expert counseling for the right career path." },
                      { icon: <FaCogs />, title: "Skill Development", desc: "Industry-oriented training and workshops." },
                      { icon: <FaGlobe />, title: "Global Exposure", desc: "International partnerships and study abroad support." },
                      { icon: <FaBriefcase />, title: "Placement Support", desc: "Assistance for better career opportunities." },
                    ].map(function(offer, i) {
                      return (
                        <motion.div
                          key={i}
                          className="offer-item"
                          initial={{ opacity: 0, y: 25 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          viewport={{ once: true, amount: 0.2 }}
                        >
                          <div className="offer-icon purple-light">{offer.icon}</div>
                          <div>
                            <h5>{offer.title}</h5>
                            <p>{offer.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>

                <div className="get-in-touch-card">
                  <h4>Get in Touch</h4>
                  <p>Have questions or need more information? We are here to help!</p>
                  <a
                    href="https://wa.me/917982295530"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-btn"
                  >
                    Contact us →
                  </a>
                  <div className="headphone-bg-icon"><FaHeadphones /></div>
                </div>

              </div>
            </FadeUp>

          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}