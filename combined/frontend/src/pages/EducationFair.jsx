import React, { useState } from "react";
import "./EducationFair.css";
import { FaArrowLeft, FaArrowRight, FaMapMarkerAlt, FaWhatsapp, FaPassport, FaGlobe, FaGraduationCap } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaMoneyBillWave, FaUniversity, FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Imported Framer Motion

const countriesDataList = [
  { name: "United Kingdom", visaType: "Tier 4 Student Visa", speed: "15 Days Processing", flag: "🇬🇧" },
  { name: "Canada", visaType: "Study Permit (SDS)", speed: "20 Days Processing", flag: "🇨🇦" },
  { name: "Australia", visaType: "Subclass 500", speed: "14 Days Processing", flag: "🇦🇺" },
  { name: "United States", visaType: "F-1 Student Visa", speed: "30 Days Processing", flag: "🇺🇸" },
  { name: "Germany", visaType: "National Visa (D)", speed: "25 Days Processing", flag: "🇩🇪" },
  { name: "France", visaType: "VLS-TS Visa", speed: "18 Days Processing", flag: "🇫🇷" },
  { name: "Ireland", visaType: "Stamp 2 Visa", speed: "20 Days Processing", flag: "🇮🇪" },
  { name: "New Zealand", visaType: "Fee Paying Student", speed: "22 Days Processing", flag: "🇳🇿" },
];

const benefits = [
  { icon: <FaMoneyBillWave />, title: "Save Application Fees", desc: "Apply to multiple universities without paying extra charges." },
  { icon: <FaUniversity />, title: "Direct Admission Guidance", desc: "Get expert support directly from university representatives." },
  { icon: <FaGraduationCap />, title: "Scholarship Opportunities and financial aid", desc: "Discover exclusive scholarships and financial aid options." },
  { icon: <FaUserTie />, title: "Career Counseling", desc: "Get personalized career advice from professionals." },
  { icon: <FaUserTie />, title: "Get Accurate information directly from expert", desc: "Get Accurate information directly from expert." },
  { icon: <FaUniversity />, title: " Meet universities in one place ", desc: "This save both time and research efforts" }
];

const coursesData = [
  "Global MBA & Management",
  "Engineering & Technology",
  "Medical & Healthcare",
  "Aviation & Aerospace",
  "Data Science & AI",
  "International Law",
  "Hospitality & Tourism",
  "Media & Mass Communication",
  "Biomedical Sciences",
  "Finance & Banking",
];

const globalUniversities = [
  { name: "University of Toronto", location: "Canada", fees: "$ 35,000 | Annual Tuition", programs: "150+ Programs", visaSuccess: "98% Visa Success Rate", img: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178" },
  { name: "University of Melbourne", location: "Australia", fees: "$ 38,000 | Annual Tuition", programs: "120+ Programs", visaSuccess: "96% Visa Success Rate", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { name: "Technical University of Munich", location: "Germany", fees: "€ 0 - 3,000 | Minimal Tuition", programs: "80+ Programs", visaSuccess: "95% Visa Success Rate", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b" },
  { name: "Coventry University", location: "United Kingdom", fees: "£ 16,500 | Annual Tuition", programs: "110+ Programs", visaSuccess: "97% Visa Success Rate", img: "https://images.unsplash.com/photo-1562774053-701939374585" },
  { name: "Arizona State University", location: "USA", fees: "$ 31,000 | Annual Tuition", programs: "200+ Programs", visaSuccess: "94% Visa Success Rate", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f" },
];

const EducationFair = () => {
  const [flagIndex, setFlagIndex] = useState(0);
  const [showMoreCountries, setShowMoreCountries] = useState(false);
  const [topIndex, setTopIndex] = useState(0);
  const [searchIndex, setSearchIndex] = useState(0);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const phoneNumber = "917982295530"; 
  const message = "Hi, I am looking to study abroad and want assistance with admission and student visas.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const visibleCourses = showAllCourses ? coursesData : coursesData.slice(0, 4);

  // Reusable Animation Configurations
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const cardPop = {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <>
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="heros">
        <div className="heros-container">
          <motion.div 
            className="heros-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="badges">✈️ Global Admissions & Visa Experts</span>
            <h1>
              Study At Your Dream Global College. <br />
              <span>We Handle The Visa!</span>
            </h1>

            <p>
              Get end-to-end guidance from picking premium international universities to seamless visa processing. Turn your global education dreams into reality today.
            </p>

            <motion.div 
              className="statss"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="cards" variants={cardPop}>
                <h2>500+</h2>
                <p>Global Universities</p>
              </motion.div>
              <motion.div className="cards" variants={cardPop}>
                <h2>100%</h2>
                <p>Visa Assistance</p>
              </motion.div>
              <motion.div className="cards" variants={cardPop}>
                <h2>15+</h2>
                <p>Countries Options</p>
              </motion.div>
            </motion.div>

            <motion.a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="whatsapps-hero-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaWhatsapp /> Talk to a Visa Expert
            </motion.a>
          </motion.div>

          <motion.div 
            className="heros-right"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <img src="https://images.pexels.com/photos/7972741/pexels-photo-7972741.jpeg" alt="Global graduates" />
          </motion.div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="benefitss">
        <div className="containers">
          <motion.div 
            className="benefitss-header"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2>Why Attend Our Education Fair?</h2>
            <p>Unlock opportunities, save money, and get expert guidance — all in one place.</p>
          </motion.div>

          <motion.div 
            className="benefitss-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {benefits.map((item, index) => (
              <motion.div className="benefits-card" key={index} variants={fadeInUp}>
                <div className="icons">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="benefitss-cta"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="benefitss-btn">
                Register Now
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* TOP COLLEGES SECTION */}
      <section className="tops-colleges">
        <div className="containers">
          <div className="headers">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2>Top Global Universities</h2>
              <p>Explore world-class campuses across popular study destinations</p>
            </motion.div>
          </div>

          <div className="sliders-container">
            <motion.div 
              className="universities-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {globalUniversities.map((college, idx) => (
                <motion.div className="customs-card" key={idx} variants={cardPop}>
                  <img src={college.img} alt={college.name} />
                  <div className="cards-body">
                    <h3>{college.name}</h3>
                    <p className="locations"><FaMapMarkerAlt /> {college.location}</p>
                    <div className="infos">
                      <span>{college.programs}</span>
                      <strong>{college.fees}</strong>
                    </div>
                    <div className="visas-badge"><FaPassport /> {college.visaSuccess}</div>
                    <motion.button 
                      onClick={() => window.open(whatsappLink, '_blank')} 
                      className="applys-btn"
                      whileHover={{ backgroundColor: "#128C7E", scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Apply & Process Visa
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="buttons-container">
              <a href='/CoursePortal'>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="tops-college-button">
                  Show More
                </motion.button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* COURSES GRID */}
      <section className="coursess">
        <div className="containers">
          <h2 className="titles">Popular Global Programs</h2>

          <motion.div 
            className="courses-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {visibleCourses.map((course, idx) => (
              <a href="/CoursePortal" key={idx} style={{ textDecoration: 'none' }}>
                <motion.div 
                  className="courses-card" 
                  variants={cardPop}
                  whileHover={{ y: -5, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
                >
                  <FaGraduationCap className="courses-icon" />
                  <span>{course}</span>
                </motion.div>
              </a>
            ))}
          </motion.div>

          <div className="shows-more">
            <button onClick={() => setShowAllCourses(!showAllCourses)}>
              {showAllCourses ? "Show Less" : "Show More Fields"}
            </button>
          </div>
        </div>
      </section>

      {/* WHATSAPP CTA BOX */}
      <section className="whatsapps-section">
        <motion.div 
          className="whatsapps-box"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="tags">CONTACT US</span>
          <h2>
            Ready To Get Started? <br />
            <span>Let’s Talk To Us Today</span>
          </h2>
          <p>
            Get expert guidance on college selection, visa process, and scholarships.
            Our consultants are ready to help you step-by-step.
          </p>
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapps-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp /> Get Started
          </motion.a>
        </motion.div>
      </section>

      {/* RECENT REVIEWS SECTION */}
      <section className="recents-reviews">
        <div className="containers">
          <motion.div 
            className="reviewss-header"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Recent Reviews</h2>
            <p>
              Hear from our global students who successfully obtained their visas and admission 
              to top-tier international universities.
            </p>
          </motion.div>

          <motion.div 
            className="reviewss-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* CARD 1 */}
            <motion.div className="reviews-card" variants={fadeInUp}>
              <div className="reviewers-avatar"></div>
              <p className="reviews-text">
                "The admission team mapped my profile perfectly to top UK universities, and the visa desk got my Tier-4 student visa approved in just 10 days with minimum effort on my end!"
              </p>
              <div className="reviews-footer">
                <div className="reviewers-info">
                  <h4>Vikas Yadav</h4>
                  <span>MSc Data Science, UK</span>
                </div>
                <div className="ratings">⭐⭐⭐⭐⭐</div>
              </div>
            </motion.div>

            {/* CARD 2 */}
            <motion.div className="reviews-card" variants={fadeInUp}>
              <div className="reviewers-avatar"></div>
              <p className="review-text">
                "Highly professional services. From SOP documentation to visa interview mock prep, their consultants guided me every step of the way for my Canadian student permit."
              </p>
              <div className="reviews-footer">
                <div className="reviewers-info">
                  <h4>Rahul Singh</h4>
                  <span>MBA Graduate, Canada</span>
                </div>
                <div className="ratings">⭐⭐⭐⭐⭐</div>
              </div>
            </motion.div>

            {/* CARD 3 */}
            <motion.div className="reviews-card" variants={fadeInUp}>
              <div className="reviewers-avatar"></div>
              <p className="reviews-text">
                "I was worried about my gap years, but their specialized immigration legal desk structured my file flawlessly. Got my Australian subclass 500 visa without a single hitch!"
              </p>
              <div className="reviews-footer">
                <div className="reviewers-info">
                  <h4>Arjun Mehra</h4>
                  <span>B.Eng Student, Australia</span>
                </div>
                <div className="ratings">⭐⭐⭐⭐⭐</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default EducationFair;