import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import Testimonials from "../components/Testimonials";
import FaqSection from "../components/FaqSection";
import StudyAbroad from "../components/StudyAbroad";
import OurServices from "../components/OurServices";
import StudyAbroadFeatures from "../components/StudyAbroadFeatures";
import StudyAbroadLayouts from "../components/StudyAbroadLayouts";
import StudyDestinations from "../components/StudyDestinations";
import BritishCouncilLogo from "../assets/bclogo.jpg";
import { motion } from "framer-motion";

// 1. Updated FadeUp with a lower y-offset and "some" viewport threshold
const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: delay }}
    viewport={{ once: true, amount: "some" }} // Triggers as soon as the element enters the viewport
  >
    {children}
  </motion.div>
);

const stats = [
  { num: "200+", label: "Institutions Worldwide" },
  { num: "7+", label: "Branches" },
  { num: "2600+", label: "Students Placed" },
  { num: "6+", label: "Years Experience" },
];

function Dashboard() {
  return (
    <>
      <Navbar />

      {/* TRUST BAR */}
      <motion.section
        className="trust-bar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="trust-container">
          <div className="trust-right">
            <img src={BritishCouncilLogo} alt="British Council" />
            <Link to="/Certificate">
              <span>Certified by British Council</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-slider">
          <img
            src="https://images.pexels.com/photos/7018490/pexels-photo-7018490.jpeg"
            alt="Study Abroad"
            className="slide"
          />
          <img
            src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070"
            alt="University"
            className="slide"
          />
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070"
            alt="Students"
            className="slide"
          />
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          {/* HERO LEFT */}
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, x: -50 }} // Slightly reduced x-offset for better mobile scaling
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="tag">
              POST STUDY WORK RIGHT – AUSTRALIA, UK, NEW ZEALAND, JAPAN, RUSSIA
            </span>
            <h1>
              Extend your stay and work
              <br />
              after Graduation
            </h1>
            <p>
              Explore world-class universities and build your future with
              global education opportunities.

            </p>

             <div class="button-container">
                <button class="compare-btn">  <Link to="/CompareUniversity">Compare tool</Link></button>
              </div>
          </motion.div>

          {/* WHATSAPP BOX */}
          <motion.div
            className="appointment-box"
            initial={{ opacity: 0, x: 50 }} // Slightly reduced x-offset
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="whatsapp-contact">
              <h3>Talk With Our Expert</h3>
              <p>
                Get free counselling for study abroad, visa guidance,
                admission process, and career opportunities abroad.
              </p>
              <Link
                to="/consultationform"
                 className="whatsapp-btn"
                 >
                Book Free Consultation
                  </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map(function(stat, i) {
            return (
              <motion.div
                key={i}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }} // Reduced y-offset from 40 to 20
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, amount: "some" }} // Changed from 0.3 to "some"
              >
                <h2>{stat.num}</h2>
                <p>{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* BAAKI SECTIONS */}
      <FadeUp><StudyDestinations /></FadeUp>
      <FadeUp delay={0.1}><StudyAbroadLayouts /></FadeUp>
      <FadeUp delay={0.1}><StudyAbroadFeatures /></FadeUp>
      <FadeUp delay={0.1}><OurServices /></FadeUp>
      <FadeUp delay={0.1}><StudyAbroad /></FadeUp>
      <FadeUp delay={0.1}><Testimonials /></FadeUp>
      <FadeUp delay={0.1}><FaqSection /></FadeUp>

      <Footer />
    </>
  );
}

export default Dashboard;