import React from 'react';
import './MissionVision.css'; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from 'framer-motion'; 

const MissionVision = () => {
  
  // ==========================================
  // MASTER SYSTEM ANIMATION VARIANTS
  // ==========================================
  
  const textRevealUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1] } 
    }
  };

  const iconEntrance = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const dividerStretch = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { 
      scaleX: 1, 
      transition: { duration: 0.7, ease: "easeInOut" } 
    }
  };

  const pillarItemEntrance = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  const listHoverEffect = {
    x: 6,
    scale: 1.012,
    transition: { duration: 0.2, ease: "easeInOut" }
  };

  // Viewport strict global config
  const scrollConfig = { once: true, amount: 0.3 };

  return (
    <>
      <Navbar />
      <div className="mv-container">
        
        {/* ==========================================
            TOP HERO BANNER
           ========================================== */}
        <div className="mv-banner">
          <div className="mv-banner-content">
            <motion.h1 
              className="mv-title" 
              variants={textRevealUp}
              initial="hidden"
              animate="visible"
            >
              Our Mission and Vision Statement
            </motion.h1>
            
            <motion.p 
              className="mv-subtitle" 
              variants={textRevealUp}
              initial="hidden"
              animate="visible"
            >
              Discover the driving purpose and future aspirations of VIET Worldgate Private Limited. 
              We define our goals, core expertise, and expectations to deliver elite global education consultancy.
            </motion.p>
          </div>
        </div>

        {/* ==========================================
            MAIN STRUCTURED CONTENT AREA
           ========================================== */}
        <div className="mv-content-wrapper">
          
          {/* Background Split Graphics Layer */}
          <div className="mv-angled-bg" />

          {/* Grid Split Content Layout */}
          <div className="mv-grid">
            
            {/* --- VISION BLOCK --- */}
            <div className="mv-card">
              {/* Icon scroll standard trigger */}
              <motion.div 
                className="mv-icon-circle"
                variants={iconEntrance}
                initial="hidden"
                whileInView="visible"
                viewport={scrollConfig}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <svg className="mv-icon" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </motion.div>
              
              <motion.h2 
                className="mv-card-heading" 
                variants={textRevealUp}
                initial="hidden"
                whileInView="visible"
                viewport={scrollConfig}
              >
                Vision
              </motion.h2>
              
              <motion.div 
                className="mv-divider" 
                variants={dividerStretch}
                initial="hidden"
                whileInView="visible"
                viewport={scrollConfig}
              />
              
              <motion.p 
                className="mv-main-statement" 
                variants={textRevealUp}
                initial="hidden"
                whileInView="visible"
                viewport={scrollConfig}
              >
                To become one of the most trusted, respected, and globally recognized education and immigration consultancy firms by transforming the lives of students through international education and global career opportunities.
              </motion.p>

              {/* Inner Pillars Section */}
              <div className="mv-pillars-list">
                <motion.h3 
                  className="mv-section-label" 
                  variants={textRevealUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollConfig}
                >
                  Our Long-Term Horizons
                </motion.h3>
                
                {[
                  { title: "Trusted Global Brand", desc: "Known for reliability, professionalism, and successful student outcomes." },
                  { title: "Empowering Future Generations", desc: "Inspiring students to become globally competitive professionals." },
                  { title: "Expanding International Presence", desc: "Strengthening partnerships with world-class universities and institutions." },
                  { title: "Delivering Excellence", desc: "High-quality counseling and transparent processes that exceed expectations." },
                  { title: "Global Success Stories", desc: "Transforming futures through admissions, scholarships, and visa approvals." },
                  { title: "Innovation & Modern Education", desc: "Adapting to digital transformations and emerging global opportunities." }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="mv-pillar-item"
                    variants={pillarItemEntrance}
                    initial="hidden"
                    whileInView="visible"
                    viewport={scrollConfig}
                    whileHover={listHoverEffect}
                  >
                    <h4 className="mv-pillar-title">{item.title}</h4>
                    <p className="mv-pillar-desc">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* --- MISSION BLOCK --- */}
            <div className="mv-card">
              {/* Icon scroll standard trigger */}
              <motion.div 
                className="mv-icon-circle"
                variants={iconEntrance}
                initial="hidden"
                whileInView="visible"
                viewport={scrollConfig}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <svg className="mv-icon" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </motion.div>
              
              <motion.h2 
                className="mv-card-heading" 
                variants={textRevealUp}
                initial="hidden"
                whileInView="visible"
                viewport={scrollConfig}
              >
                Mission
              </motion.h2>
              
              <motion.div 
                className="mv-divider" 
                variants={dividerStretch}
                initial="hidden"
                whileInView="visible"
                viewport={scrollConfig}
              />
              
              <motion.p 
                className="mv-main-statement" 
                variants={textRevealUp}
                initial="hidden"
                whileInView="visible"
                viewport={scrollConfig}
              >
                To empower students, graduates, and professionals by providing trusted guidance, transparent consultation, and quality international education opportunities that help them build successful global careers.
              </motion.p>

              {/* Inner Pillars Section */}
              <div className="mv-pillars-list">
                <motion.h3 
                  className="mv-section-label" 
                  variants={textRevealUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollConfig}
                >
                  Our Commitments
                </motion.h3>
                
                {[
                  { title: "Student-Centered Guidance", desc: "Personalized support helping individuals make informed pathway decisions." },
                  { title: "Transparency & Ethical Practices", desc: "Dedicated to maintaining absolute honesty, integrity, and professionalism." },
                  { title: "Quality International Opportunities", desc: "Connecting students with globally recognized institutions and scholarships." },
                  { title: "End-to-End Support", desc: "Comprehensive care from initial counseling up to pre-departure steps." },
                  { title: "Continuous Growth & Innovation", desc: "Upgrading services matching modern global trends and immigration policies." },
                  { title: "Global Career Development", desc: "Preparing students with confidence and skills for a competitive environment." }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="mv-pillar-item"
                    variants={pillarItemEntrance}
                    initial="hidden"
                    whileInView="visible"
                    viewport={scrollConfig}
                    whileHover={listHoverEffect}
                  >
                    <h4 className="mv-pillar-title">{item.title}</h4>
                    <p className="mv-pillar-desc">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Layout Copyright Text */}
          <motion.div 
            className="mv-footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p>© {new Date().getFullYear()} VIET Worldgate Private Limited. All rights reserved.</p>
          </motion.div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default MissionVision;