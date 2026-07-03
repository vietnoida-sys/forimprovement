import React from 'react';
import './ValuesGrid.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from 'framer-motion';

// --- Production-Grade Scroll Transition Presets ---
const slideUpScroll = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: [0.16, 1, 0.3, 1] // Elegant bezier timing
    } 
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const ValuesGrid = () => {
  // Your text broken down cleanly into exactly 8 strategic highlight items
  const valuesData = [
    {
      id: 1,
      title: "Global Career Building",
      desc: "Since our establishment in 2020, we have been helping students and professionals achieve their international dreams through transparent, ethical, and result-oriented guidance.",
      icon: (
        <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="#006B4A" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Intercontinental Footprint",
      desc: "With modern counseling facilities setup in Noida, Ghaziabad, Delhi, and London (UK), we actively bridge the structural gap between applicants and recognized global universities.",
      icon: (
        <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="#FF5757" strokeWidth="2">
          <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
          <circle cx="12" cy="10" r="3" fill="#FF5757"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Personalized Course Selection",
      desc: "We deliver custom academic pairing profiles to identify precise career tracks for students exploring Undergraduate, Postgraduate, MBA, or specialized foundation pathway modules.",
      icon: (
        <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Elite Admission Management",
      desc: "Our processing specialists supervise tracking, portfolio document validations, university interface logistics, and rapid offer letter acquisitions to optimize your conversion rates.",
      icon: (
        <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Scholarship Consultation",
      desc: "International tuition needs structured optimization. We guide eligible qualifiers toward unlocking merit scholarships up to 70% in partnering countries.",
      icon: (
        <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    },
    {
      id: 6,
      title: "End-to-End Visa Strategy",
      desc: "Securing student visas requires meticulous precision. We manage documentation frameworks, financial layouts, registry filings, and comprehensive mock interview simulations.",
      icon: (
        <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2">
          <rect x="3" y="4" width="18" height="15" rx="2" />
          <line x1="16" y1="2" x2="16" y2="4" />
          <line x1="8" y1="2" x2="8" y2="4" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    },
    {
      id: 7,
      title: "Student-Centered Mission",
      desc: "We simplify immigration hurdles through an empathetic, student-focused service mindset, assisting every unique individual with real-world pre-departure readiness maps.",
      icon: (
        <svg className="value-icon" viewBox="0 0 24 24" fill="#FF4D4D" stroke="#FF4D4D" strokeWidth="1">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )
    },
    {
      id: 8,
      title: "Long-Term Integrity Horizon",
      desc: "Our vision is focused on honesty and long-term satisfaction. We consistently adapt to shifting global regulatory guidelines to maximize your ultimate international success.",
      icon: (
        <svg className="value-icon" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    }
  ];

  return (
    <>
      <Navbar />
      <div className="values-container">
        {/* Upper header segment (Triggers on load) */}
        <motion.div 
          className="values-header"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="values-company-subtitle">VIET Worldgate Private Limited</p>
          <h1 className="values-main-title">Our services & core values</h1>
        </motion.div>

        {/* Grid wrapper (Triggers on scroll) */}
        <motion.div 
          className="values-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {valuesData.map((item) => (
            <motion.div 
              key={item.id} 
              className="value-card"
              variants={slideUpScroll}
            >
              <div className="value-icon-circle">
                {item.icon}
              </div>
              <div className="value-text-block">
                <h2 className="value-card-title">{item.title}</h2>
                <p className="value-card-desc">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default ValuesGrid;