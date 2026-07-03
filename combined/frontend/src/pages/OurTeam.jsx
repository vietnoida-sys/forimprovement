import React from 'react';
import './OurTeam.css'; // Link to your separate CSS sheet
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

// ── ASSETS IMPORT ──────────────────────────────────────────
import logo from '../assets/vietworldgate1.png'; // Import your company logo
import NanduIMG from '../assets/team/nandu.png';
import PawanImg from '../assets/team/pawan.jpeg';
import Ritika from '../assets/team/ritika.jpeg';
import Lakhshyasharma from '../assets/team/lkhsharma.png';
import Raghav from '../assets/team/raghav.jpeg';
import Anushka from '../assets/team/anushka.jpeg';
import Navneet from '../assets/team/navneet.png';
import Suraj from '../assets/team/newsurajsir.jpeg';

const teamMembers = [
  { name: 'Suraj Sharma', role: 'Founder & Director', image: Suraj },
  { name: 'Navneet Kaur', role: 'Co-Director', image: Navneet },
  { name: 'Raghav Trikha', role: 'Bussiness Development Manager', image: Raghav },
  { name: 'Nandkishore Kushwah', role: 'Web Developer', image: NanduIMG },
  { name: 'Pavan Kushwah', role: 'Assistant Web developer', image: PawanImg },
  { name: 'Lakshy Sharma', role: 'Bussiness Development Executive', image: Lakhshyasharma },
  { name: 'Ritika Singh', role: 'Bussiness Development Executive', image: Ritika },
  { name: 'Anushka Gupta', role: 'Bussiness Development Executive', image: Anushka }
];

const teamRoles = [
  {
    title: "Education Counselors",
    description: "Our counselors are trained experts who understand global education systems and help students choose the right country, course, and university based on their goals, academic background, and budget.",
    icon: "🎓"
  },
  {
    title: "Admission Specialists",
    description: "They ensure that every student application is professionally prepared, error-free, and aligned with university requirements to maximize admission success.",
    icon: "📄"
  },
  {
    title: "Visa Experts",
    description: "Our visa team provides complete support for documentation, application filing, and interview preparation to ensure a smooth and successful visa process.",
    icon: "🛡️"
  },
  {
    title: "Career Advisors",
    description: "They guide students in selecting career-oriented courses and help align education with long-term global career opportunities.",
    icon: "🧭"
  }
];

const approaches = [
  "Personalized one-on-one guidance",
  "Transparent and ethical consultation",
  "Up-to-date knowledge of global education trends",
  "End-to-end student support",
  "Focus on long-term success, not just admissions"
];

const differentiators = [
  "Strong industry experience",
  "Student-first approach",
  "High success rate in admissions and visas",
  "Continuous learning and improvement",
  "Commitment to quality service"
];

const OurTeam = () => {
  const topRow = teamMembers.slice(0, 5);
  const bottomRow = teamMembers.slice(5);

  // ── PR LEVEL STAGGER CONFIGURATION ────────────────────────
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const innerContentContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const innerContentItem = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const viewportConfig = { once: true, amount: 0.15 };

  return (
    <>
      <Navbar />
      <div className="team-page">
        
        {/* Industry-Level Hero Section */}
        <section className="hero-section">
          <div className="container-max">
            <motion.div 
              className="hero-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Left Column: Authoritative Brand Messaging */}
              <div className="hero-content-left">
                <motion.div className="brand-header-inline" variants={itemVariants}>
                  <div className="company-logo-wrapper">
                    <img 
                      src={logo} 
                      alt="VIET Worldgate Logo" 
                      className="company-logo-img" 
                    />
                  </div>
                  <p className="company-subtitle">VIET Worldgate Private Limited</p>
                </motion.div>

                <motion.h1 className="hero-title" variants={itemVariants}>Our Team</motion.h1>
                <motion.p className="hero-description" variants={itemVariants}>
                  At VIET Worldgate Private Limited, our strength lies in our people. We are a team of experienced 
                  professionals dedicated to guiding students and professionals toward successful international careers.
                  Our team combines expertise in education counseling, university admissions, visa processing, and career 
                  planning to provide accurate, transparent, and result-oriented guidance at every stage of the journey.
                </motion.p>
              </div>

              {/* Right Column: Premium Geometric Value Card */}
              <motion.div className="hero-badge-right" variants={itemVariants}>
                <p className="badge-tagline">Result-Oriented Global Guidance</p>
                <div className="mini-stats-row">
                  <div className="stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Transparency</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">End-to-End</span>
                    <span className="stat-label">Student Support</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Meet The Team Grid Section */}
        <div className="team-wrapper">
          <motion.h1 
            className="team-main-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.5 }}
          >
            Meet the team
          </motion.h1>
          
          <div className="team-grid-container">
            {/* Top Row - Exact 5 columns */}
            <motion.div 
              className="team-grid-row row-of-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {topRow.map((member, i) => (
                <motion.div key={i} className="team-member-card" variants={itemVariants}>
                  <div className="avatar-circle">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <h3 className="member-fullname">{member.name}</h3>
                  <p className="member-designation">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom Row - Exact 4 columns centered */}
            <motion.div 
              className="team-grid-row row-of-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {bottomRow.map((member, i) => (
                <motion.div key={i} className="team-member-card" variants={itemVariants}>
                  <div className="avatar-circle">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <h3 className="member-fullname">{member.name}</h3>
                  <p className="member-designation">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Grid Section: Who makes up our team */}
        <section className="team-roles-section">
          <div className="container-max">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
            >
              Who Makes Up Our Team
            </motion.h2>
            
            <motion.div 
              className="grid-layout"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {teamRoles.map((role, index) => (
                <motion.div key={index} className="role-card" variants={itemVariants}>
                  <span className="card-icon">{role.icon}</span>
                  <motion.div 
                    variants={innerContentContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <motion.h3 className="card-title" variants={innerContentItem}>{role.title}</motion.h3>
                    <motion.p className="card-text" variants={innerContentItem}>{role.description}</motion.p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Operations & Support Highlight */}
            <motion.div 
              className="support-box"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
            >
              <span className="card-icon">💼</span>
              <div>
                <h3 className="support-title">Support & Operations Team</h3>
                <p className="support-text">Our backend team ensures smooth coordination, timely updates, and continuous support throughout the student journey.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container-max">
          <hr className="section-divider" />
        </div>

        {/* Dual Lists: Approach and Differentiators */}
        <section className="container-max">
          <div className="dual-section">
            
            {/* Approach */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <motion.h2 className="sub-section-title" variants={itemVariants}>Our Approach as a Team</motion.h2>
              <ul className="feature-list">
                {approaches.map((item, index) => (
                  <motion.li key={index} className="feature-item" variants={itemVariants}>
                    <span className="check-icon">✓</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Differentiators */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <motion.h2 className="sub-section-title" variants={itemVariants}>What Makes Our Team Different</motion.h2>
              <ul className="feature-list blue-check">
                {differentiators.map((item, index) => (
                  <motion.li key={index} className="feature-item" variants={itemVariants}>
                    <span className="check-icon">✓</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>
        </section>

        {/* Footer Bottom Banner */}
        <section className="commitment-banner">
          <motion.div 
            className="commitment-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.5 }}
          >
            <h2 className="commitment-title">Our Commitment</h2>
            <p className="commitment-text">
              "As a team, we are committed to helping every student make the right decision, achieve their academic goals, and build a successful future globally."
            </p>
          </motion.div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default OurTeam;