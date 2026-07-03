import React from "react";
import "./Infrastructure.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/vietworldgate1.png";
import { motion } from "framer-motion"; // 1. Framer motion import kiya

const Infrastructure = () => {
  const facilities = [
    {
      img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      title: "Student Counseling Center",
      desc: "Dedicated counseling cabins where our experts guide students in choosing the right country, course, and university.",
    },
    {
      img: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
      title: "Visa Documentation Support",
      desc: "Specialized team and workspace for preparing strong visa files, SOPs, and documentation with high approval success.",
    },
    {
      img: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
      title: "University Selection Zone",
      desc: "Access to updated university databases, brochures, and global admission resources to help students choose wisely.",
    },
    {
      img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
      title: "IELTS & Interview Training Rooms",
      desc: "Smart classrooms for IELTS preparation, mock interviews, and confidence-building sessions for visa success.",
    },
    {
      img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      title: "Seminar & Guidance Hall",
      desc: "We regularly host seminars and sessions to guide students about study abroad opportunities and visa processes.",
    },
    {
      img: "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg",
      title: "Digital Processing System",
      desc: "Fast and secure digital systems to manage applications, track progress, and ensure smooth processing of student visas.",
    },
  ];

  // --- PREMIUM ANIMATION CONFIGURATIONS (VARIANTS) ---
  
  // Grid container ke liye stagger delay configuration
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // Har card 0.12s ke gap par aayega
      }
    }
  };

  // Fade-in Up effect headings aur small text ke liye
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1] } 
    }
  };

  // Facilities individual card animation with micro-bounce
  const cardVariant = {
    hidden: { opacity: 0, y: 45, scale: 0.96 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 65, damping: 13 } 
    }
  };

  return (
    <>
      <Navbar />

      {/* ===== HERO SECTION WITH ENERGETIC ENTRANCE ===== */}
      <section className="infra-hero">
        <div className="hero-overlay"></div>

        <div className="hero-container-box">

          {/* Left Side (Text & Logo) */}
          <motion.div 
            className="hero-text-wrapper"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="hero-heading-inline">
              <motion.div 
                className="hero-badge-inline"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              >
                <img src={logo} alt="VietWorldGate Logo" />
              </motion.div>
              <h1>
                VIET-WORLDGATE <span>Infrastructure</span>
              </h1>
            </div>

            <p>
              Our infrastructure is designed to support students at every step 
              of their study abroad journey — from career counseling to visa approval.
            </p>
          </motion.div>

          {/* Right Side Stats (Staggered Loading) */}
          <motion.div 
            className="hero-stats-side"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="stat-item" variants={fadeInUp}>
              <h3>99%</h3>
              <p>Visa Success</p>
            </motion.div>
            <motion.div className="stat-item" variants={fadeInUp}>
              <h3>500+</h3>
              <p>Universities</p>
            </motion.div>
            <motion.div className="stat-item" variants={fadeInUp}>
              <h3>10k+</h3>
              <p>Students Guided</p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ===== FACILITIES SECTION WITH SCROLL TRIGGER ===== */}
      <section className="infra-section">
        
        {/* Section Header */}
        <motion.div 
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span>Our Facilities</span>
          <h2>Everything You Need for Study Abroad</h2>
        </motion.div>

        {/* 6 Facilities Cards Grid */}
        <motion.div 
          className="infra-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }} // 15% section dikhte hi flow shuru ho jayega
        >
          {facilities.map((item, index) => (
            <motion.div 
              className="infra-card" 
              key={index}
              variants={cardVariant}
              whileHover={{ y: -8, transition: { duration: 0.2 } }} // Hover interactive effect
            >
              <div className="card-img-wrapper">
                <img src={item.img} alt={item.title} loading="lazy" />
              </div>
              <div className="card-info">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default Infrastructure;